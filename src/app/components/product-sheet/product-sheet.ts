import {
  afterRenderEffect, ChangeDetectionStrategy, Component, computed, ElementRef, inject, linkedSignal, viewChild,
} from '@angular/core';
import { FLAVORS, TOPPINGS } from '../../data/menu';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { ProductVisual } from '../../shared/cup';
import { Icon } from '../../shared/icon';
import { MoneyPipe } from '../../shared/money.pipe';

/** Panel para personalizar un granizado: tamaño, toppings, nota y cantidad. */
@Component({
  selector: 'app-product-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductVisual, Icon, MoneyPipe],
  templateUrl: './product-sheet.html',
  styleUrl: './product-sheet.scss',
  host: { '(document:keydown.escape)': 'close()' },
})
export class ProductSheet {
  protected readonly ui = inject(UiService);
  private readonly cart = inject(CartService);
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  protected readonly product = this.ui.selected;

  // Cada vez que se abre otro producto, todo vuelve a su valor inicial.
  protected readonly sizeIndex = linkedSignal(() => (this.product(), 0));
  protected readonly picked = linkedSignal<string[]>(() => (this.product(), []));
  protected readonly note = linkedSignal(() => (this.product(), ''));
  protected readonly qty = linkedSignal(() => (this.product(), 1));
  protected readonly flavor = linkedSignal<string | null>(() => (this.product(), null));
  protected readonly flavors = FLAVORS;
  protected readonly needsFlavor = computed(() => !!this.product()?.flavorPick && !this.flavor());
  protected readonly triedAdd = linkedSignal(() => (this.product(), false));

  protected readonly toppings = computed(() =>
    (this.product()?.toppings ?? []).map((id) => ({ id, ...TOPPINGS[id] })),
  );

  protected readonly unitPrice = computed(() => {
    const p = this.product();
    if (!p) return 0;
    const base = p.sizes[this.sizeIndex()].price;
    return base + this.picked().reduce((s, id) => s + TOPPINGS[id].price, 0);
  });

  protected readonly total = computed(() => this.unitPrice() * this.qty());

  constructor() {
    afterRenderEffect(() => {
      const open = !!this.product();
      document.body.classList.toggle('no-scroll', open || this.ui.cartOpen());
      if (open) this.closeBtn()?.nativeElement.focus();
    });
  }

  toggleTopping(id: string) {
    this.picked.update((list) => (list.includes(id) ? list.filter((t) => t !== id) : [...list, id]));
  }

  changeQty(delta: number) {
    this.qty.update((q) => Math.min(20, Math.max(1, q + delta)));
  }

  add() {
    const p = this.product();
    if (!p) return;
    if (this.needsFlavor()) {
      this.triedAdd.set(true);
      document.getElementById('sheet-flavors')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    this.cart.add(p, p.sizes[this.sizeIndex()], this.picked(), this.note(), this.qty(), this.flavor() ?? undefined);
    this.ui.notify(`${this.qty()} × ${p.name} agregado 🧊`);
    this.close();
  }

  close() {
    if (this.product()) this.ui.closeProduct();
  }
}
