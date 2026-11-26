import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { Icon } from '../../shared/icon';
import { MoneyPipe } from '../../shared/money.pipe';

/** Barra flotante abajo con el resumen del pedido (aparece cuando hay productos). */
@Component({
  selector: 'app-cart-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, MoneyPipe],
  template: `
    @if (cart.count() > 0 && !ui.cartOpen() && !ui.selected()) {
      <button type="button" class="bar" (click)="ui.openCart()">
        <span class="bar__count">{{ cart.count() }}</span>
        <span class="bar__label">Ver pedido</span>
        <strong>{{ cart.total() | money }}</strong>
        <app-icon name="arrow" />
      </button>
    }
  `,
  styles: `
    .bar {
      position: fixed; z-index: 60; left: 50%; bottom: calc(1rem + env(safe-area-inset-bottom));
      transform: translateX(-50%);
      display: flex; align-items: center; gap: .8rem;
      width: min(92vw, 420px); padding: .7rem 1.1rem .7rem .7rem;
      background: var(--surface-2); color: var(--ink);
      border: 2px solid var(--line-strong); border-radius: 999px;
      box-shadow: 0 10px 30px -8px rgba(0, 0, 0, .8), var(--glow-purple);
      animation: rise .4s var(--ease) both;
    }
    .bar__count { display: grid; place-items: center; min-width: 38px; height: 38px; padding: 0 8px;
                  background: var(--blue); color: var(--on-hi); border-radius: 999px; font-weight: 800; }
    .bar__label { flex: 1; text-align: left; font-family: var(--font-display); font-weight: 600; font-size: 1.1rem; }
    strong { font-family: var(--font-display); font-size: 1.15rem; }
    @keyframes rise { from { transform: translate(-50%, 140%); } }
  `,
})
export class CartBar {
  protected readonly cart = inject(CartService);
  protected readonly ui = inject(UiService);
}
