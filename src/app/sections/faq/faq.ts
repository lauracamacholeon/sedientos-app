import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAQS } from '../../data/menu';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section id="preguntas" class="section faq" aria-labelledby="faq-title">
      <div class="container faq__inner">
        <header class="section__head" appReveal>
          <p class="eyebrow">Preguntas</p>
          <h2 id="faq-title">Lo que más nos <span class="hl">preguntan</span></h2>
          <p>¿Tienes otra duda? Escríbenos por WhatsApp y te respondemos rapidito.</p>
        </header>
        <div class="faq__list">
          @for (f of faqs; track f.q; let i = $index) {
            <details class="faq__item" [open]="i === 0" [appReveal]="i * 70">
              <summary>{{ f.q }} <span class="faq__toggle"><app-icon name="plus" /></span></summary>
              <p>{{ f.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .faq { background: var(--bg-2); border-top: 1px solid var(--line); }
    .faq__inner { display: grid; grid-template-columns: .8fr 1.2fr; gap: 3rem; align-items: start; }
    .faq__list { display: grid; gap: .9rem; }
    .faq__item {
      background: var(--surface); border: var(--border); border-radius: 20px; box-shadow: var(--pop-sm);
      summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem 1.3rem;
                font-family: var(--font-display); font-weight: 600; font-size: 1.2rem; cursor: pointer; list-style: none; }
      summary::-webkit-details-marker { display: none; }
      p { padding: 0 1.3rem 1.25rem; color: var(--muted); }
      &[open] .faq__toggle { transform: rotate(45deg); background: var(--purple); color: #fff; box-shadow: var(--glow-purple); }
    }
    .faq__toggle { display: grid; place-items: center; width: 34px; height: 34px; flex: none; border: 2px solid var(--line-strong);
                   border-radius: 50%; background: var(--blue); color: var(--on-hi); transition: transform .25s var(--ease), background .2s; }
    @media (max-width: 860px) { .faq__inner { grid-template-columns: 1fr; gap: 0; } }
  `,
})
export class Faq {
  protected readonly faqs = FAQS;
}
