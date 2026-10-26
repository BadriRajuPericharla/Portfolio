import { useEffect } from 'react';

/**
 * useScrollReveal
 * 
 * High-performance, lightweight IntersectionObserver that brings smooth,
 * professional entrance animations as sections and elements appear while scrolling.
 * Inspires motion quality from top portfolios (AOS-style cubic-bezier transitions).
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observe
    observeElements();

    // Re-check after minor delay for any asynchronous child mounts
    const timeout = setTimeout(observeElements, 100);

    // Mutation observer to capture dynamically toggled categories / tabs
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, dependencies);
}

export default useScrollReveal;
