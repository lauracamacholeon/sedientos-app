import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CupColors, CupShape } from '../data/models';

/** Dibujo en estilo letrero de neón (como el logo): cada línea es un tubo de color
 *  con un hilo blanco por dentro. Sirve de "foto" mientras no tengas fotos reales.
 *  El color sale de `colors.top` de cada producto en menu.ts. */
@Component({
  selector: 'app-cup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cup', 'aria-hidden': 'true', '[style.--c]': 'main()', '[style.--a]': 'accent()' },
  template: `
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none"
         stroke-linecap="round" stroke-linejoin="round">
      @switch (shape()) {
        @case ('bowl') {
          <!-- pecera -->
          <g class="tube a">
            <path d="M46 62 L36 16" /><path d="M60 60 L62 8" /><path d="M74 62 L88 20" />
          </g>
          <g class="core a">
            <path d="M46 62 L36 16" /><path d="M60 60 L62 8" /><path d="M74 62 L88 20" />
          </g>
          <g class="tube">
            <path d="M42 62 A48 48 0 1 0 78 62" />
            <path d="M36 60 H84" />
            <path d="M16 112 C30 104 44 120 60 112 C76 104 90 120 104 112" />
          </g>
          <g class="core">
            <path d="M42 62 A48 48 0 1 0 78 62" />
            <path d="M36 60 H84" />
            <path d="M16 112 C30 104 44 120 60 112 C76 104 90 120 104 112" />
          </g>
          <g class="dots"><circle cx="42" cy="128" r="3.2" /><circle cx="64" cy="136" r="2.6" /><circle cx="80" cy="124" r="3" /></g>
        }
        @case ('cooler') {
          <!-- neverita -->
          <g class="tube a">
            <path d="M40 60 L32 20" /><path d="M56 58 L58 12" /><path d="M74 58 L86 20" />
          </g>
          <g class="core a">
            <path d="M40 60 L32 20" /><path d="M56 58 L58 12" /><path d="M74 58 L86 20" />
          </g>
          <g class="tube">
            <path d="M14 62 H106 V78 H14 Z" />
            <path d="M20 78 L26 148 Q27 152 31 152 H89 Q93 152 94 148 L100 78" />
            <path d="M46 70 H74" />
            <path d="M60 98 C55 106 51 110 51 116 a9 9 0 0 0 18 0 C69 110 65 106 60 98 Z" />
          </g>
          <g class="core">
            <path d="M14 62 H106 V78 H14 Z" />
            <path d="M20 78 L26 148 Q27 152 31 152 H89 Q93 152 94 148 L100 78" />
            <path d="M46 70 H74" />
            <path d="M60 98 C55 106 51 110 51 116 a9 9 0 0 0 18 0 C69 110 65 106 60 98 Z" />
          </g>
        }
        @case ('shot') {
          <!-- shot -->
          <g class="tube">
            <path d="M34 54 H86 L77 146 Q76 152 70 152 H50 Q44 152 43 146 Z" />
            <path d="M39 86 H81" />
          </g>
          <g class="core">
            <path d="M34 54 H86 L77 146 Q76 152 70 152 H50 Q44 152 43 146 Z" />
            <path d="M39 86 H81" />
          </g>
          <g class="tube a"><path d="M50 100 L52 136" /></g>
          <g class="core a"><path d="M50 100 L52 136" /></g>
        }
        @default {
          <!-- vaso de granizado -->
          <g class="tube a"><path d="M68 40 L80 4 H90" /></g>
          <g class="core a"><path d="M68 40 L80 4 H90" /></g>
          <g class="tube">
            <path d="M16 68 C10 54 22 44 32 46 C34 32 50 28 58 34 C66 24 86 26 88 40 C100 40 110 54 104 68" />
            <path d="M12 68 H108" />
            <path d="M18 74 L30 150 Q31 154 35 154 H85 Q89 154 90 150 L102 74" />
          </g>
          <g class="core">
            <path d="M16 68 C10 54 22 44 32 46 C34 32 50 28 58 34 C66 24 86 26 88 40 C100 40 110 54 104 68" />
            <path d="M12 68 H108" />
            <path d="M18 74 L30 150 Q31 154 35 154 H85 Q89 154 90 150 L102 74" />
          </g>
          <!-- la lengua de Sedientos -->
          <g class="tube a"><path d="M48 112 C56 100 78 98 78 110 C78 122 66 130 59 125 C55 122 57 117 48 112 Z" /></g>
          <g class="core a"><path d="M48 112 C56 100 78 98 78 110 C78 122 66 130 59 125 C55 122 57 117 48 112 Z" /></g>
        }
      }
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg {
      width: 100%; height: 100%; display: block; overflow: visible;
      filter: drop-shadow(0 0 3px var(--c)) drop-shadow(0 0 10px color-mix(in srgb, var(--c) 70%, transparent));
    }
    .tube { stroke: var(--c); stroke-width: 6; }
    .core { stroke: #ffffff; stroke-width: 1.8; opacity: .9; }
    .tube.a { stroke: var(--a); }
    .dots { fill: #ffffff; }
  `,
})
export class Cup {
  readonly colors = input.required<CupColors>();
  readonly shape = input<CupShape | undefined>('cup');

  /** Color principal del tubo de neón. */
  protected readonly main = computed(() => this.colors().top);
  /** Color de acento (pitillo, chorrito, lengua). */
  protected readonly accent = computed(() =>
    this.colors().top.toLowerCase().startsWith('#ff') ? '#7ebbf2' : '#e0607e',
  );
}

/** Imagen del producto: foto si existe, si no el dibujo de neón. */
@Component({
  selector: 'app-product-visual',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cup],
  template: `
    @if (image()) {
      <img [src]="image()" [alt]="alt()" loading="lazy" decoding="async" />
    } @else {
      <app-cup [colors]="colors()" [shape]="shape()" />
    }
  `,
  styles: `
    :host { display: flex; align-items: center; justify-content: center; }
    img { width: 100%; height: 100%; object-fit: cover; }
    app-cup { height: 100%; max-width: 100%; aspect-ratio: 3 / 4; }
  `,
})
export class ProductVisual {
  readonly colors = input.required<CupColors>();
  readonly image = input<string | undefined>();
  readonly alt = input('');
  readonly shape = input<CupShape | undefined>('cup');
}
