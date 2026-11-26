import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { PRODUCTS } from '../../data/menu';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-favorites',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCard, Reveal, Icon],
  template: `
    <section class="section favs" aria-labelledby="favs-title">
      <div class="container">
        <header class="favs__head" appReveal>
          <div class="section__head">
            <p class="eyebrow">Los favoritos</p>
            <h2 id="favs-title">Los que <span class="hl">más piden</span></h2>
            <p>Si no sabes cuál escoger, empieza por aquí. Toca uno para escoger tamaño y adicionales.</p>
          </div>
          <a href="#carta" class="btn btn--sm">Toda la carta <app-icon name="arrow" /></a>
        </header>
        <div class="favs__grid">
          @for (p of featured; track p.id; let i = $index) {
            <app-product-card [product]="p" [big]="true" [appReveal]="i * 110" />
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .favs__head { display: flex; align-items: end; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
                  margin-bottom: clamp(2rem, 5vw, 3rem); .section__head { margin: 0; } }
    .favs__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    @media (max-width: 900px) {
      .favs__grid { grid-template-columns: repeat(3, minmax(260px, 1fr)); overflow-x: auto; scroll-snap-type: x mandatory;
                    padding: .3rem 1.25rem 1.2rem; margin-inline: -1.25rem; }
      .favs__grid > * { scroll-snap-align: center; }
    }
  `,
})
export class Favorites {
  protected readonly featured = PRODUCTS.filter((p) => p.featured);
}
