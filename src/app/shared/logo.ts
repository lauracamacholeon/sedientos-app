import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Logo para el encabezado y el pie: el ícono (aro + lengua) y el nombre en neón.
 *  El logo completo está en public/img/logo.webp. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img src="img/logo-icon.webp" alt="" width="180" height="129" />
    <span class="name">sedient<b>o</b>s</span>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: .45rem; line-height: 1; }
    img { width: 50px; height: auto; filter: drop-shadow(0 0 8px rgba(166, 59, 255, .55)); }
    .name {
      font-family: var(--font-display); font-weight: 600; font-size: 1.6rem; letter-spacing: -.01em;
      color: transparent; -webkit-text-stroke: 1.4px var(--blue);
      text-shadow: 0 0 10px rgba(126, 187, 242, .55);
    }
    b { font-weight: inherit; -webkit-text-stroke-color: var(--red); text-shadow: 0 0 10px rgba(255, 51, 71, .7); }
  `,
})
export class Logo {}
