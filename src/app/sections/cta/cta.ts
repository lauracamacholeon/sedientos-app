import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PRODUCTS } from '../../data/menu';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { Cup } from '../../shared/cup';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cup, Icon, Reveal],
  template: `
    <section class="section cta">
      <div class="container">
        <div class="cta__box" appReveal>
          <div class="cta__copy">
            <h2>¿Con <span class="hand">sed</span>? Te la quitamos.</h2>
            <p>Arma tu pedido en un minuto y te llega directo a WhatsApp. #TeamSedientos</p>
            @if (cart.count() > 0) {
              <button type="button" class="btn btn--lime" (click)="ui.openCart()">
                <app-icon name="bag" /> Ver mi pedido ({{ cart.count() }})
              </button>
            } @else {
              <a href="#carta" class="btn btn--lime">Pedir ahora <app-icon name="arrow" /></a>
            }
          </div>
          <div class="cta__cup" aria-hidden="true"><app-cup [colors]="cupColors" /></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cta__box { position: relative; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 2rem;
                padding: clamp(2rem, 6vw, 4rem); overflow: hidden;
                background: radial-gradient(120% 140% at 100% 100%, var(--wine), transparent 60%), linear-gradient(135deg, #2a0b45, #12081d); color: var(--ink);
                border: 2px solid var(--purple); border-radius: 36px; box-shadow: var(--glow-purple); }
    h2 { font-size: clamp(2.4rem, 7vw, 4.6rem); max-width: 12ch; }
    .hand { color: var(--pink); font-size: 1.15em; }
    p { margin: 1rem 0 1.8rem; font-size: 1.2rem; opacity: .9; }
    .cta__cup { width: clamp(140px, 22vw, 230px); aspect-ratio: 3 / 4; transform: rotate(10deg);
                filter: drop-shadow(0 0 22px rgba(224, 96, 126, .55)); animation: float 5s ease-in-out infinite; --r: 10deg; }
    @media (max-width: 640px) { .cta__box { grid-template-columns: 1fr; } .cta__cup { position: absolute; right: -20px; bottom: -30px; width: 120px; opacity: .9; } }
  `,
})
export class Cta {
  protected readonly cart = inject(CartService);
  protected readonly ui = inject(UiService);
  protected readonly cupColors = PRODUCTS.find((p) => p.id === 'tentacion')!.colors;
}
