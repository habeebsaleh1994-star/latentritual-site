// Quiet motion for Latent the Ritual.
// One observer reveals sections on scroll; one handler tints
// the Materials heading toward the hovered film stock.

(() => {
  // Respect prefers-reduced-motion. The CSS already shows the static
  // final state under that media query, so we just bail.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Hero develop-reveal + replay. Plays once and rests on the resolved frame;
  // a quiet "Replay" control then lets the photograph develop again. Reduced-
  // motion visitors get no autoplay — the control becomes their opt-in to watch
  // the develop once, on demand. Same control covers blocked autoplay.
  const heroVideo = document.querySelector('.hero-video');
  const heroOverlay = document.querySelector('[data-hero-replay-overlay]');
  const heroReplay = document.querySelector('.hero-replay');
  if (heroVideo instanceof HTMLVideoElement) {
    const showReplay = () => { if (heroOverlay) heroOverlay.classList.add('is-visible'); };
    const hideReplay = () => { if (heroOverlay) heroOverlay.classList.remove('is-visible'); };

    heroVideo.addEventListener('ended', showReplay);

    if (heroReplay) {
      heroReplay.addEventListener('click', () => {
        hideReplay();
        heroVideo.currentTime = 0;
        const p = heroVideo.play();
        if (p !== undefined) p.catch(showReplay);
      });
    }

    if (reduce.matches) {
      showReplay(); // no autoplay; offer the develop on demand
    } else {
      const p = heroVideo.play();
      if (p !== undefined) p.catch(showReplay); // blocked → let them trigger it
    }
  }

  if (reduce.matches) return;

  // ---------- Safelight ------------------------------------------------------
  // A faint amber pool that trails the pointer, the one light a darkroom
  // allows. Fine pointers only (it's meaningless under a thumb), and it
  // sits below this file's reduce guard so reduced-motion visitors never
  // get a moving light. The lerp keeps it drifting a beat behind the
  // hand — a lamp you carry, not a cursor skin.
  if (window.matchMedia('(pointer: fine)').matches) {
    const safelight = document.createElement('div');
    safelight.className = 'safelight';
    safelight.setAttribute('aria-hidden', 'true');
    document.body.appendChild(safelight);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;

    window.addEventListener('pointermove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    const drift = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      safelight.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(drift);
    };
    requestAnimationFrame(drift);
  }

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
  const storyVideos = document.querySelectorAll('.story-clip video, .stage-panel video, .stage-image video');
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
