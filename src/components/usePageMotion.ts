import { useEffect, type RefObject } from 'react';

/** One observer for the page; visible content stays readable without animation support. */
export function usePageMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const page = root.current;
    if (!page || !('IntersectionObserver' in window)) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = page.querySelectorAll<HTMLElement>('.reveal, .impact > div');
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      // Mark content already onscreen as visible before enabling entrance transitions.
      elements.forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${index % 2 * 95}ms`);
        element.classList.toggle('is-visible', media.matches || element.getBoundingClientRect().top < innerHeight);
      });
      page.classList.toggle('motion-ready', !media.matches);
      if (media.matches) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer?.unobserve(entry.target);
      }), { threshold: .08 });
      elements.forEach(element => observer?.observe(element));
    };
    setup();
    media.addEventListener('change', setup);
    return () => { observer?.disconnect(); media.removeEventListener('change', setup); page.classList.remove('motion-ready'); };
  }, [root]);
}
