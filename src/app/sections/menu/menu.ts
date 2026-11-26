import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { CATEGORIES, PRODUCTS } from '../../data/menu';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCard, Icon, Reveal],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  protected readonly query = signal('');

  /** Categorías con sus productos, ya filtrados por la búsqueda. */
  protected readonly groups = computed(() => {
    const q = normalize(this.query().trim());
    return CATEGORIES.map((cat) => ({
      ...cat,
      products: PRODUCTS.filter(
        (p) => p.category === cat.id && (!q || normalize(p.name + ' ' + p.desc).includes(q)),
      ),
    })).filter((g) => g.products.length > 0);
  });

  protected readonly categories = CATEGORIES;

  onSearch(e: Event) {
    this.query.set((e.target as HTMLInputElement).value);
  }
}
