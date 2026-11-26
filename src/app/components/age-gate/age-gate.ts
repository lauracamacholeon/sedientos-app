import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LEGAL } from '../../data/menu';
import { Storage } from '../../services/storage';

const KEY = 'sedientos.age.v1';

/** Pregunta de mayoría de edad. Se muestra una sola vez por navegador. */
@Component({
  selector: 'app-age-gate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state() !== 'ok') {
      <div class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
        <div class="gate__box">
          <img src="img/logo.webp" alt="Sedientos Granizados" width="520" height="512" />
          @if (state() === 'ask') {
            <h2 id="gate-title">¿Eres mayor de 18 años?</h2>
            <p>Nuestros granizados tienen licor. Para entrar confirma tu edad.</p>
            <div class="gate__actions">
              <button type="button" class="btn btn--primary" (click)="yes()">Sí, soy mayor</button>
              <button type="button" class="btn" (click)="state.set('no')">No</button>
            </div>
          } @else {
            <h2 id="gate-title">¡Te esperamos!</h2>
            <p>Vuelve cuando cumplas 18. Mientras tanto, hidrátate con agüita 💧</p>
            <button type="button" class="btn btn--sm" (click)="state.set('ask')">Volver</button>
          }
          <small>{{ legal[0] }}</small>
        </div>
      </div>
    }
  `,
  styles: `
    .gate { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: 1.25rem;
            background: rgba(4, 2, 8, .94); backdrop-filter: blur(6px); }
    .gate__box { width: min(100%, 420px); display: grid; justify-items: center; gap: 1rem; text-align: center;
                 padding: 2rem 1.5rem; background: var(--surface); border: 2px solid var(--purple);
                 border-radius: 28px; box-shadow: var(--glow-purple); }
    img { width: 190px; height: auto; }
    h2 { font-size: 1.9rem; }
    p { color: var(--muted); }
    .gate__actions { display: flex; gap: .7rem; flex-wrap: wrap; justify-content: center; }
    small { color: #8a7c9e; font-size: .78rem; }
  `,
})
export class AgeGate {
  private readonly storage = inject(Storage);
  /** 'ok' en el servidor para que el HTML prerenderizado no quede tapado. */
  protected readonly state = signal<'ask' | 'no' | 'ok'>('ok');
  protected readonly legal = LEGAL;

  constructor() {
    afterNextRender(() => {
      if (!this.storage.get<boolean>(KEY, false)) {
        this.state.set('ask');
        document.body.classList.add('no-scroll');
      }
    });
  }

  yes() {
    this.storage.set(KEY, true);
    this.state.set('ok');
    document.body.classList.remove('no-scroll');
  }
}
