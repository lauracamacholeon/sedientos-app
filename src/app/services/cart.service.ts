import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CONFIG, TOPPINGS } from '../data/menu';
import { Product, Size } from '../data/models';
import { Storage } from './storage';

export interface CartItem {
  key: string;            // identifica combinaciones iguales para sumarlas
  productId: string;
  name: string;
  size: string;
  flavor?: string;        // sabor escogido (peceras, neveritas)
  toppings: string[];     // nombres legibles
  note: string;
  unitPrice: number;      // tamaño + toppings
  qty: number;
}

export type DeliveryMode = 'domicilio' | 'recoger';

export interface Customer {
  name: string;
  mode: DeliveryMode;
  address: string;
  neighborhood: string;
  payment: string;
  notes: string;
}

const CART_KEY = 'sedientos.cart.v1';
const CUSTOMER_KEY = 'sedientos.customer.v1';

const EMPTY_CUSTOMER: Customer = {
  name: '', mode: 'domicilio', address: '', neighborhood: '', payment: '', notes: '',
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storage = inject(Storage);

  readonly items = signal<CartItem[]>([]);
  readonly customer = signal<Customer>({ ...EMPTY_CUSTOMER });

  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.unitPrice * i.qty, 0));

  private loaded = false;

  constructor() {
    // Guarda automáticamente cada vez que cambian (solo en el navegador).
    effect(() => {
      const items = this.items();
      if (this.loaded) this.storage.set(CART_KEY, items);
    });
    effect(() => {
      const c = this.customer();
      if (this.loaded) this.storage.set(CUSTOMER_KEY, { ...c, notes: '' });
    });
  }

  /** Se llama una vez en el navegador (desde App) para recuperar el carrito guardado. */
  restore(): void {
    this.items.set(this.storage.get<CartItem[]>(CART_KEY, []));
    this.customer.set({ ...EMPTY_CUSTOMER, ...this.storage.get<Partial<Customer>>(CUSTOMER_KEY, {}) });
    this.loaded = true;
  }

  add(product: Product, size: Size, toppingIds: string[], note: string, qty: number, flavor?: string): void {
    const toppingNames = toppingIds.map((id) => TOPPINGS[id].name);
    const unitPrice = size.price + toppingIds.reduce((s, id) => s + TOPPINGS[id].price, 0);
    const key = [product.id, size.name, flavor ?? '', [...toppingIds].sort().join('+'), note.trim().toLowerCase()].join('|');

    this.items.update((list) => {
      const existing = list.find((i) => i.key === key);
      if (existing) {
        return list.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...list, {
        key, productId: product.id, name: product.name, size: size.name, flavor,
        toppings: toppingNames, note: note.trim(), unitPrice, qty,
      }];
    });
  }

  changeQty(key: string, delta: number): void {
    this.items.update((list) =>
      list
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }

  remove(key: string): void {
    this.items.update((list) => list.filter((i) => i.key !== key));
  }

  clear(): void {
    this.items.set([]);
  }

  updateCustomer(patch: Partial<Customer>): void {
    this.customer.update((c) => ({ ...c, ...patch }));
  }

  /** Arma el mensaje del pedido y devuelve el enlace de WhatsApp. */
  whatsappUrl(): string {
    const c = this.customer();
    const lines: string[] = [];
    lines.push(`¡Hola ${CONFIG.name}! 👅 Quiero hacer este pedido:`);
    lines.push('');
    for (const i of this.items()) {
      const size = i.size !== i.name ? ` (${i.size})` : '';
      lines.push(`• ${i.qty} × ${i.name}${size} — ${money(i.unitPrice * i.qty)}`);
      if (i.flavor) lines.push(`   Sabor: ${i.flavor}`);
      if (i.toppings.length) lines.push(`   + ${i.toppings.join(', ')}`);
      if (i.note) lines.push(`   Nota: ${i.note}`);
    }
    lines.push('');
    lines.push(`*Total productos: ${money(this.total())}*`);
    if (c.mode === 'domicilio') lines.push('(+ domicilio, por confirmar)');
    lines.push('');
    lines.push(`👤 ${c.name}`);
    if (c.mode === 'domicilio') {
      lines.push(`🛵 Domicilio: ${c.address}${c.neighborhood ? ', ' + c.neighborhood : ''}`);
    } else {
      lines.push('🏃 Paso a recoger');
    }
    if (c.payment) lines.push(`💳 Pago: ${c.payment}`);
    if (c.notes.trim()) lines.push(`📝 ${c.notes.trim()}`);

    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  }
}

export const money = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');
