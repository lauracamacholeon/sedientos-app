import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONFIG, PRODUCTS } from '../../data/menu';
import { Cup } from '../../shared/cup';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

/** Galería. Mientras no haya fotos se muestran vasos dibujados;
 *  cuando tengas fotos, cambia `tiles` por una lista de rutas de imagen. */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cup, Icon, Reveal],
  template: `
    <section id="galeria" class="section gallery" aria-labelledby="gallery-title">
      <div class="container">
        <header class="gallery__head" appReveal>
          <div class="section__head">
            <p class="eyebrow">Galería</p>
            <h2 id="gallery-title">Se ve así de <span class="hl">rico</span></h2>
          </div>
          <a [href]="config.instagram" target="_blank" rel="noopener" class="btn btn--sm">
            <app-icon name="instagram" /> {{ config.instagramHandle }}
          </a>
        </header>
        <div class="gallery__grid">
          @for (p of tiles; track p.id; let i = $index) {
            <figure class="gallery__tile" [style.--tile]="p.colors.top" [appReveal]="(i % 3) * 90">
              <app-cup [colors]="p.colors" />
              <figcaption>{{ p.name }}</figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .gallery__head { display: flex; align-items: end; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
                     margin-bottom: clamp(2rem, 5vw, 3rem); .section__head { margin: 0; } }
    .gallery__grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 220px; gap: 1rem; }
    .gallery__tile {
      position: relative; margin: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;
      background: radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--tile) 35%, transparent) 0 34%, color-mix(in srgb, var(--tile) 14%, #0f0918) 35%);
      border: var(--border); border-radius: var(--radius); box-shadow: var(--pop-sm);
      app-cup { height: 72%; aspect-ratio: 3 / 4; transition: transform .4s var(--ease); }
      &:hover app-cup { transform: rotate(-6deg) scale(1.08); }
      figcaption { position: absolute; left: 12px; bottom: 12px; padding: .2rem .7rem; background: var(--surface);
                   border: 2px solid var(--line-strong); border-radius: 999px; font-weight: 700; font-size: .85rem; }
    }
    .gallery__tile:nth-child(1) { grid-column: span 2; grid-row: span 2; }
    @media (max-width: 760px) {
      .gallery__grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 170px; }
    }
  `,
})
export class Gallery {
  protected readonly config = CONFIG;
  protected readonly tiles = PRODUCTS.filter((p) => p.category === 'granizados').slice(0, 5);
}
