import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CONFIG, LEGAL } from '../../data/menu';
import { CartItem, CartService, Customer, DeliveryMode } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { Icon } from '../../shared/icon';
import { MoneyPipe } from '../../shared/money.pipe';

/** Carrito: lista del pedido, datos del cliente y envío por WhatsApp. */
@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, MoneyPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
  host: { '(document:keydown.escape)': 'close()' },
})
export class CartDrawer {
  protected readonly cart = inject(CartService);
  protected readonly ui = inject(UiService);
  protected readonly payments = CONFIG.paymentMethods;
  protected readonly legal = LEGAL;

  protected readonly c = this.cart.customer;
  protected readonly triedSubmit = signal(false);
  protected readonly sentUrl = signal<string | null>(null);

  protected readonly errors = computed(() => {
    const c = this.c();
    return {
      name: !c.name.trim() ? 'Escribe tu nombre' : null,
      address: c.mode === 'domicilio' && !c.address.trim() ? 'Escribe la dirección de entrega' : null,
      payment: !c.payment ? 'Escoge cómo vas a pagar' : null,
    };
  });
  protected readonly valid = computed(() => Object.values(this.errors()).every((e) => !e));

  constructor() {
    // Al cerrar el carrito, se limpia el aviso de "pedido enviado".
    effect(() => {
      if (!this.ui.cartOpen()) {
        this.sentUrl.set(null);
        this.triedSubmit.set(false);
      }
    });
  }

  /** "16 oz · Sabor Barbie · Combo 2" */
  detail(i: CartItem): string {
    return [i.size !== i.name ? i.size : '', i.flavor ? `Sabor ${i.flavor}` : '', ...i.toppings]
      .filter(Boolean)
      .join(' · ');
  }

  set<K extends keyof Customer>(key: K, value: Customer[K]) {
    this.cart.updateCustomer({ [key]: value } as Partial<Customer>);
  }

  setMode(mode: DeliveryMode) {
    this.set('mode', mode);
  }

  input(key: keyof Customer, e: Event) {
    this.set(key, (e.target as HTMLInputElement).value);
  }

  send() {
    this.triedSubmit.set(true);
    if (!this.valid()) {
      setTimeout(() => document.querySelector<HTMLElement>('.cart [aria-invalid="true"]')?.focus());
      return;
    }
    const url = this.cart.whatsappUrl();
    this.sentUrl.set(url);
    window.open(url, '_blank', 'noopener');
  }

  newOrder() {
    this.cart.clear();
    this.sentUrl.set(null);
    this.ui.closeCart();
  }

  close() {
    if (this.ui.cartOpen()) this.ui.closeCart();
  }
}
