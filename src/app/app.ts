import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AgeGate } from './components/age-gate/age-gate';
import { CartBar } from './components/cart-bar/cart-bar';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { ProductSheet } from './components/product-sheet/product-sheet';
import { Toast } from './components/toast/toast';
import { Cta } from './sections/cta/cta';
import { Faq } from './sections/faq/faq';
import { Favorites } from './sections/favorites/favorites';
import { Footer } from './sections/footer/footer';
import { Gallery } from './sections/gallery/gallery';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { Info } from './sections/info/info';
import { Marquee } from './sections/marquee/marquee';
import { Menu } from './sections/menu/menu';
import { Steps } from './sections/steps/steps';
import { CartService } from './services/cart.service';

/** Página completa: el orden de las secciones es el orden de esta plantilla. */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Header, Hero, Marquee, Favorites, Menu, Steps, Info, Gallery, Faq, Cta, Footer,
    ProductSheet, CartDrawer, CartBar, Toast, AgeGate,
  ],
  template: `
    <a class="skip-link" href="#carta">Saltar a la carta</a>
    <app-header />
    <main>
      <app-hero />
      <app-marquee />
      <app-favorites />
      <app-menu />
      <app-steps />
      <app-info />
      <app-gallery />
      <app-faq />
      <app-cta />
    </main>
    <app-footer />

    <app-product-sheet />
    <app-cart-drawer />
    <app-cart-bar />
    <app-toast />
    <app-age-gate />
  `,
})
export class App {
  constructor() {
    const cart = inject(CartService);
    // Recupera el pedido guardado en este navegador (no existe durante el prerender).
    afterNextRender(() => cart.restore());
  }
}
