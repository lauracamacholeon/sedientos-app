import { afterNextRender, Directive, ElementRef, inject, input } from '@angular/core';

/** Hace aparecer el elemento con una animación suave cuando entra en pantalla.
 *  Uso: <div appReveal> o <div [appReveal]="120"> (retraso en ms). */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  readonly appReveal = input<number | ''>('');
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (!('IntersectionObserver' in window)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight) return; // ya visible al cargar: no lo escondemos

      const delay = Number(this.appReveal()) || 0;
      node.classList.add('reveal');
      node.style.transitionDelay = `${delay}ms`;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              node.classList.add('is-in');
              io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      io.observe(node);
    });
  }
}
