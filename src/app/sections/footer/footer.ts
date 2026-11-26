import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONFIG, LEGAL } from '../../data/menu';
import { Icon } from '../../shared/icon';
import { Logo } from '../../shared/logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Logo, Icon],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <app-logo />
          <p>{{ config.slogan }}</p>
        </div>
        <nav class="footer__nav" aria-label="Pie de página">
          <a href="#carta">Carta</a>
          <a href="#como-pedir">Cómo pedir</a>
          <a href="#horario">Horario</a>
          <a href="#preguntas">Preguntas</a>
        </nav>
        <div class="footer__contact">
          <a [href]="'https://wa.me/' + config.whatsapp" target="_blank" rel="noopener">
            <app-icon name="whatsapp" /> {{ config.whatsappDisplay }}
          </a>
          <a [href]="config.instagram" target="_blank" rel="noopener">
            <app-icon name="instagram" /> {{ config.instagramHandle }}
          </a>
        </div>
      </div>
      <div class="container footer__warn">
        @for (l of legal; track l) { <p>{{ l }}</p> }
      </div>
      <div class="container footer__legal">
        <p>© {{ year }} {{ config.name }}. Tu pedido se guarda solo en este dispositivo hasta que lo envías.</p>
      </div>
    </footer>
  `,
  styles: `
    .footer { background: var(--bg-2); color: var(--muted); padding: 3.5rem 0 7rem; border-top: 1px solid var(--line-strong); }
    .footer__inner { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 2rem; align-items: start; }
    
    .footer__brand p { margin-top: .6rem; }
    .footer__nav, .footer__contact { display: grid; gap: .55rem; }
    a { text-decoration: none; display: inline-flex; align-items: center; gap: .5rem; width: fit-content; }
    a:hover { color: var(--lime); }
    .footer__legal { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line);
                     font-size: .88rem; color: #8a7c9e; }
    .footer__warn { margin-top: 2.2rem; padding: 1rem 1.2rem; border: 1px solid var(--line-strong); border-radius: 16px;
                    text-align: center; font-weight: 800; color: var(--ink); text-transform: uppercase; font-size: .85rem; letter-spacing: .02em; }
    @media (max-width: 760px) { .footer__inner { grid-template-columns: 1fr; } }
  `,
})
export class Footer {
  protected readonly config = CONFIG;
  protected readonly legal = LEGAL;
  protected readonly year = new Date().getFullYear();
}
