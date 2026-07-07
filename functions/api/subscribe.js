// Cloudflare Pages Function — POST /api/subscribe
//
// Signups go through here instead of posting straight to Buttondown's public
// embed form. That public endpoint is gated by Buttondown's firewall / Cloudflare
// Turnstile ("Verify your subscription"), which silently rejects our custom form
// with HTTP 400 — so nobody was ever added, while the page falsely showed success.
// Buttondown's authenticated API (below) is NOT behind that gate. The API key
// lives only in the BUTTONDOWN_API_KEY environment variable (Pages → Settings →
// Environment variables) and is never exposed to the browser.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export const onRequestPost = async ({ request, env }) => {
  // Accept a JSON body (the enhanced form) or form-encoded (no-JS fallback).
  let data = {};
  try {
    if ((request.headers.get("content-type") || "").includes("application/json")) {
      data = await request.json();
    } else {
      data = Object.fromEntries(await request.formData());
    }
  } catch {
    /* leave data empty → fails the email check below */
  }

  const email = String(data.email || "").trim();
  const tag = String(data.tag || "").trim();

  // Honeypot: a hidden field real people never fill. Pretend success, drop it.
  if (String(data.website || "").trim() !== "") return json({ ok: true });

  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "invalid_email" }, 400);
  if (!env.BUTTONDOWN_API_KEY) return json({ ok: false, error: "not_configured" }, 500);

  let res;
  try {
    res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        // "regular" = added immediately, no confirmation email. Remove this line
        // to switch to Buttondown's double opt-in (subscriber must click to confirm).
        type: "regular",
        tags: tag ? [tag] : [],
        referrer_url: request.headers.get("Referer") || undefined,
        ip_address: request.headers.get("CF-Connecting-IP") || undefined,
      }),
    });
  } catch {
    return json({ ok: false, error: "upstream_unreachable" }, 502);
  }

  if (res.ok) return json({ ok: true });

  // Already on the list → Buttondown returns 400; that's a success for the visitor.
  const body = await res.text();
  if (res.status === 400 && /already|exist|subscrib/i.test(body)) {
    return json({ ok: true, already: true });
  }
  return json({ ok: false, error: "buttondown_error", status: res.status }, 502);
};
