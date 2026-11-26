import { Injectable, signal } from '@angular/core';
import { Product } from '../data/models';

/** Estado de la interfaz: qué panel está abierto y los avisos (toasts). */
@Injectable({ providedIn: 'root' })
export class UiService {
  readonly selected = signal<Product | null>(null);
  readonly cartOpen = signal(false);
  readonly toast = signal<string | null>(null);

  private toastTimer?: ReturnType<typeof setTimeout>;

  openProduct(p: Product) {
    this.selected.set(p);
  }
  closeProduct() {
    this.selected.set(null);
  }
  openCart() {
    this.cartOpen.set(true);
  }
  closeCart() {
    this.cartOpen.set(false);
  }

  notify(msg: string) {
    this.toast.set(msg);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 2200);
  }
}
