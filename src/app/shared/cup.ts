import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CupColors, CupShape } from '../data/models';

let uid = 0;

/** Vaso de granizado dibujado en SVG. Sirve de "foto" mientras no tengas fotos reales.
 *  Los colores salen de cada producto en menu.ts. */
@Component({
  selector: 'app-cup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cup', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient [attr.id]="id + 'b'" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" [attr.stop-color]="colors().top" />
          <stop offset="1" [attr.stop-color]="colors().bottom" />
        </linearGradient>
        <radialGradient [attr.id]="id + 'd'" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.85" />
          <stop offset="0.45" [attr.stop-color]="colors().top" />
          <stop offset="1" [attr.stop-color]="colors().bottom" />
        </radialGradient>
      </defs>

      @switch (shape()) {
        @case ('bowl') {
          <!-- pecera -->
          <g stroke-linecap="round" stroke-width="5">
            <path d="M44 70 L30 14" stroke="#7ebbf2" /><path d="M58 66 L60 6" stroke="#ff5a9e" />
            <path d="M72 68 L90 16" stroke="#ffd84a" /><path d="M52 68 L44 22" stroke="#a63bff" />
          </g>
          <ellipse cx="60" cy="104" rx="52" ry="48" fill="#ffffff" fill-opacity=".1" stroke="#ffffff" stroke-opacity=".55" stroke-width="2.5" />
          <path [attr.fill]="'url(#' + id + 'b)'" d="M10 104 a50 46 0 0 0 100 0 C96 96 80 112 60 104 C40 96 24 112 10 104 Z" />
          <ellipse cx="60" cy="58" rx="24" ry="6" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="2.5" />
          <g>
            <circle cx="36" cy="124" r="5" fill="#ffd84a" /><circle cx="70" cy="132" r="4" fill="#7ebbf2" />
            <circle cx="84" cy="116" r="5" fill="#ff5a9e" /><circle cx="54" cy="138" r="3.5" fill="#ffffff" />
          </g>
          <path d="M22 84 C18 98 20 114 28 126" stroke="#ffffff" stroke-opacity=".55" stroke-width="4" fill="none" stroke-linecap="round" />
        }
        @case ('cooler') {
          <!-- neverita -->
          <g stroke-linecap="round" stroke-width="5">
            <path d="M36 62 L28 20" stroke="#7ebbf2" /><path d="M52 60 L54 12" stroke="#ff5a9e" />
            <path d="M70 60 L80 18" stroke="#ffd84a" /><path d="M86 62 L100 30" stroke="#a63bff" />
          </g>
          <ellipse cx="48" cy="60" rx="10" ry="7" fill="#e0607e" /><ellipse cx="76" cy="58" rx="9" ry="7" fill="#ff3347" />
          <rect x="12" y="62" width="96" height="16" rx="6" [attr.fill]="colors().top" />
          <path [attr.fill]="'url(#' + id + 'b)'" d="M16 76 H104 L98 148 Q97 154 91 154 H29 Q23 154 22 148 Z" />
          <path d="M16 76 H104 L98 148 Q97 154 91 154 H29 Q23 154 22 148 Z" fill="#ffffff" fill-opacity=".9" />
          <rect x="30" y="98" width="60" height="30" rx="8" [attr.fill]="'url(#' + id + 'b)'" />
          <path d="M60 104 C56 110 53 113 53 117 a7 7 0 0 0 14 0 C67 113 64 110 60 104 Z" fill="#ffffff" />
          <path d="M26 84 L30 144" stroke="#ffffff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round" />
        }
        @case ('shot') {
          <!-- shot -->
          <path d="M34 58 H86 L78 146 Q77 152 71 152 H49 Q43 152 42 146 Z" fill="#ffffff" fill-opacity=".14" stroke="#ffffff" stroke-opacity=".6" stroke-width="2.5" />
          <path [attr.fill]="'url(#' + id + 'b)'" d="M38 82 H82 L77 144 Q76 148 72 148 H48 Q44 148 43 144 Z" />
          <path d="M42 66 L48 140" stroke="#ffffff" stroke-opacity=".6" stroke-width="4" stroke-linecap="round" />
          <rect x="30" y="54" width="60" height="8" rx="4" fill="#ffffff" fill-opacity=".8" />
        }
        @default {
          <!-- pitillo -->
          <rect x="70" y="2" width="9" height="62" rx="4.5" transform="rotate(14 74 33)" fill="#ffffff" />
          <path d="M71 12 l9 -3 M70 26 l9 -3 M70 40 l9 -3" transform="rotate(14 74 33)"
                stroke="#a63bff" stroke-width="3.5" stroke-linecap="round" />

          <!-- hielo raspado (domo) -->
          <path [attr.fill]="'url(#' + id + 'd)'"
                d="M16 72 C12 56 22 46 32 46 C34 34 48 28 58 34 C66 24 84 26 88 40 C100 40 108 52 104 72 Z" />
          <g fill="#ffffff" opacity=".85">
            <circle cx="36" cy="54" r="2.4" /><circle cx="52" cy="44" r="1.8" />
            <circle cx="68" cy="50" r="2.6" /><circle cx="84" cy="48" r="1.6" />
            <circle cx="44" cy="64" r="1.6" /><circle cx="92" cy="60" r="2" />
          </g>
          @if (colors().syrup) {
            <path [attr.fill]="colors().syrup"
                  d="M22 60 C30 52 40 58 48 52 C56 46 64 54 72 48 C80 42 90 50 98 56
                     L98 62 C94 60 92 70 88 66 C84 62 80 58 74 60 C70 62 70 72 66 70
                     C62 68 60 60 52 62 C46 64 44 70 40 68 C36 66 34 62 28 64 Z"
                  opacity=".92" />
          }

          <!-- vaso -->
          <path [attr.fill]="'url(#' + id + 'b)'" d="M18 70 H102 L90 152 Q89 156 85 156 H35 Q31 156 30 152 Z" />
          <path d="M18 70 H102 L90 152 Q89 156 85 156 H35 Q31 156 30 152 Z"
                fill="#ffffff" fill-opacity=".06" stroke="#ffffff" stroke-opacity=".25" stroke-width="1.5" />
          <path d="M28 80 L36 146" stroke="#ffffff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round" />
          <path d="M40 80 L42 92" stroke="#ffffff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round" />
          <rect x="13" y="66" width="94" height="9" rx="4.5" fill="#ffffff" fill-opacity=".9" />
          <!-- etiqueta: la lengua de Sedientos -->
          <circle cx="62" cy="112" r="15" fill="#0b0612" fill-opacity=".85" stroke="#a63bff" stroke-width="2" />
          <path d="M55 110 C58 104 70 102 71 108 C72 114 66 120 61 118 C58 117 59 113 55 110 Z" fill="#e0607e" />
        }
      }
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
  `,
})
export class Cup {
  readonly colors = input.required<CupColors>();
  readonly shape = input<CupShape | undefined>('cup');
  protected readonly id = `cup${++uid}`;
}

/** Imagen del producto: foto si existe, si no el vaso dibujado. */
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
  readonly shape = input<CupShape | undefined>('cup');
  readonly alt = input('');
}
