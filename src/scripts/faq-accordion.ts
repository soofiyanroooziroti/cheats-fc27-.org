/** Site-wide FAQ accordion — one open at a time, all closed by default. */

export function setupFaqAccordions() {
  document.querySelectorAll<HTMLElement>('[data-faq-accordion]').forEach((root) => {
    if (root.dataset.faqAccordionBound === 'true') return;
    root.dataset.faqAccordionBound = 'true';

    const items = [...root.querySelectorAll<HTMLElement>('.faq-accordion__item')];

    const closeAll = () => {
      items.forEach((item) => {
        item.classList.remove('is-open');
        const btn = item.querySelector<HTMLButtonElement>('.faq-accordion__trigger');
        const panel = item.querySelector<HTMLElement>('.faq-accordion__panel');
        btn?.setAttribute('aria-expanded', 'false');
        panel?.setAttribute('aria-hidden', 'true');
      });
    };

    items.forEach((item) => {
      const btn = item.querySelector<HTMLButtonElement>('.faq-accordion__trigger');
      const panel = item.querySelector<HTMLElement>('.faq-accordion__panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        closeAll();
        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          panel.setAttribute('aria-hidden', 'false');
        }
      });
    });
  });
}
