import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MARQUEE } from '../../data/menu';

/** Franja de palabras que se desliza sin parar. */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" aria-hidden="true">
      @for (copy of [0, 1]; track copy) {
        <div class="marquee__track">
          @for (w of words; track $index) {
            <span>{{ w }}</span><b>✦</b>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './marquee.scss',
})
export class Marquee {
  // Repetimos las palabras para que la franja sea más ancha que cualquier pantalla.
  protected readonly words = [...MARQUEE, ...MARQUEE];
}
