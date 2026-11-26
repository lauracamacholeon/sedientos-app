import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <section id="como-pedir" class="section" aria-labelledby="steps-title">
      <div class="container">
        <header class="section__head" appReveal>
          <p class="eyebrow">Cómo pedir</p>
          <h2 id="steps-title">Tres pasos y <span class="hl">listo</span></h2>
        </header>
        <ol class="steps">
          @for (s of steps; track s.n; let i = $index) {
            <li class="card steps__item" [style.--c]="s.color" [appReveal]="i * 120">
              <span class="steps__n">{{ s.n }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .steps__item { padding: 1.8rem; position: relative; }
    .steps__n { display: grid; place-items: center; width: 64px; height: 64px; margin-bottom: 1.2rem;
                border: 0; border-radius: 20px; background: var(--c); color: var(--on-hi); box-shadow: 0 0 22px -4px var(--c);
                font-family: var(--font-display); font-weight: 700; font-size: 2rem; transform: rotate(-6deg); }
    h3 { font-size: 1.6rem; margin-bottom: .5rem; }
    p { color: var(--muted); }
    @media (max-width: 820px) { .steps { grid-template-columns: 1fr; } }
  `,
})
export class Steps {
  protected readonly steps = [
    { n: 1, color: 'var(--blue)', title: 'Arma tu pedido', text: 'Escoge sabor, tamaño y adicionales. Todo se guarda en tu pedido, aunque cierres la página.' },
    { n: 2, color: 'var(--purple-soft)', title: 'Envíalo por WhatsApp', text: 'Con un toque nos llega el pedido completo y organizado. Sin escribir nada a mano.' },
    { n: 3, color: 'var(--pink)', title: 'Recibe o recoge', text: 'Te confirmamos el total y el tiempo. Lo preparamos al momento y lo llevamos bien frío. Ten tu documento a mano.' },
  ];
}
