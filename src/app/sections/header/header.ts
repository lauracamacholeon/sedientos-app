import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { Icon } from '../../shared/icon';
import { Logo } from '../../shared/logo';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Logo, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly cart = inject(CartService);
  protected readonly ui = inject(UiService);
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { href: '#carta', label: 'Carta' },
    { href: '#como-pedir', label: 'Cómo pedir' },
    { href: '#horario', label: 'Horario' },
    { href: '#galeria', label: 'Galería' },
    { href: '#preguntas', label: 'Preguntas' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 12);
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
