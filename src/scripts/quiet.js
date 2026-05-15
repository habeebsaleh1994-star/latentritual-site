// Quiet motion for Latent the Ritual.
// One observer reveals sections on scroll; one handler tints
// the Materials heading toward the hovered film stock.

(() => {
  // Respect prefers-reduced-motion. The CSS already shows the static
  // final state under that media query, so we just bail.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
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
})();
