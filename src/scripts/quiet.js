// Quiet motion for Latent the Ritual.
// One observer reveals sections on scroll; one handler tints
// the Materials heading toward the hovered film stock.

(() => {
  // Respect prefers-reduced-motion. The CSS already shows the static
  // final state under that media query, so we just bail.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Hero develop-reveal video: play once when motion is allowed. Reduced-motion
  // visitors keep the resolved poster frame. No loop — it rests once developed.
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo instanceof HTMLVideoElement && !reduce.matches) {
    const p = heroVideo.play();
    if (p !== undefined) p.catch(() => {/* autoplay blocked → poster stays */});
  }

  if (reduce.matches) return;

  // ---------- Section reveals ----------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      {
        // Trigger 200px BEFORE the element reaches the viewport bottom.
        // By the time the scroll brings the element into actual view,
        // it's already most of the way through its fade-up — feels like
        // things "are" rather than "happen".
        rootMargin: '0px 0px 200px 0px',
        threshold: 0,
      }
    );

    for (const el of revealEls) io.observe(el);
  } else {
    // No IntersectionObserver support: reveal everything immediately.
    for (const el of revealEls) el.classList.add('is-visible');
  }

  // ---------- Materials hover tint -----------------------------------------
  const materials = document.querySelector('.materials');
  if (materials) {
    materials.addEventListener('mouseover', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const stock = target.closest('.stock');
      if (stock && stock instanceof HTMLElement && stock.dataset.swatch) {
        materials.style.setProperty('--hover-tint', stock.dataset.swatch);
      }
    });
    materials.addEventListener('mouseleave', () => {
      materials.style.removeProperty('--hover-tint');
    });
  }

  // ---------- Story videos play/pause --------------------------------------
  // Two autoplay-muted videos on the same page can collide with browser
  // autoplay heuristics; the second one (below the fold at page load) is
  // often silently skipped. Calling .play() explicitly when the video
  // enters viewport gets around that, and pausing when it leaves saves
  // CPU/battery on phones.
  const storyVideos = document.querySelectorAll('.story-clip video');
  if ('IntersectionObserver' in window && storyVideos.length) {
    const videoIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = /** @type {HTMLVideoElement} */ (entry.target);
          if (entry.isIntersecting) {
            const p = video.play();
            if (p !== undefined) p.catch(() => {/* autoplay blocked, leave poster */});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    for (const video of storyVideos) videoIO.observe(video);
  }

  // ---------- Complete section workspace tabs ------------------------------
  // Tabs in the section label AND items in the description grid both toggle
  // which screenshot is shown. Click either, both highlight, screen crossfades.
  const complete = document.querySelector('.complete');
  if (complete) {
    const tabs = complete.querySelectorAll('.complete-tab');
    const screens = complete.querySelectorAll('.complete-screen');
    const items = complete.querySelectorAll('.complete-item');

    const activate = (id) => {
      if (!id) return;
      for (const tab of tabs) tab.classList.toggle('is-active', tab.dataset.target === id);
      for (const screen of screens) screen.classList.toggle('is-active', screen.dataset.screen === id);
      for (const item of items) item.classList.toggle('is-active', item.dataset.item === id);
    };

    complete.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const tab = target.closest('.complete-tab');
      const item = target.closest('.complete-item');
      if (tab instanceof HTMLElement && tab.dataset.target) {
        activate(tab.dataset.target);
      } else if (item instanceof HTMLElement && item.dataset.item) {
        activate(item.dataset.item);
      }
    });
  }
})();
