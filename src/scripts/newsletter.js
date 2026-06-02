// Newsletter subscribe progressive enhancement. No-JS path already
// works (native form POST to Buttondown). This adds an intercepted
// submit with an on-brand inline confirmation, and a graceful fallback.
// Supports multiple independent forms on a page (the footer newsletter
// plus any page-level waitlist), each wrapped in its own [data-newsletter].

(() => {
  const roots = document.querySelectorAll('[data-newsletter]');
  if (!roots.length) return;

  roots.forEach((root) => {
    const form = root.querySelector('[data-newsletter-form]');
    const errorEl = root.querySelector('[data-newsletter-error]');
    const input = form ? form.querySelector('input[type="email"]') : null;
    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
      if (!input.checkValidity()) {
        e.preventDefault();
        if (errorEl) errorEl.hidden = false;
        input.focus();
        return;
      }
      if (errorEl) errorEl.hidden = true;

      // If the Buttondown action is still the placeholder, let the native
      // submit happen so nothing silently no-ops in dev.
      const action = form.getAttribute('action') || '';
      if (action.includes('REPLACE_WITH_BUTTONDOWN')) return;

      e.preventDefault();

      const finish = () => {
        const done = root.querySelector('[data-newsletter-done]');
        if (done) done.hidden = false;
        root.classList.add('is-done');
      };

      // Optimistic confirmation: mode:'no-cors' yields an opaque response,
      // so Buttondown's actual result is unreadable. We treat a completed
      // request as success - a duplicate subscribe is idempotent on their
      // side, so the user's perceived outcome stays true. A hard network
      // failure falls through to a native submit so the address still
      // reaches Buttondown's hosted page.
      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors',
      })
        .then(finish)
        .catch(() => {
          form.submit();
        });
    });
  });
})();
