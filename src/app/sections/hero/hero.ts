import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CONFIG, PRODUCTS } from '../../data/menu';
import { money } from '../../services/cart.service';
import { ScheduleService } from '../../services/schedule.service';
import { Cup } from '../../shared/cup';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cup, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly schedule = inject(ScheduleService);
  protected readonly config = CONFIG;
  protected readonly flavors = PRODUCTS.filter((p) => p.category === 'granizados').length;
  protected readonly fromPrice = money(Math.min(...PRODUCTS.filter((p) => p.category === 'granizados').flatMap((p) => p.sizes.map((s) => s.price))));
  protected readonly cups = ['tentacion', 'barbie', 'shot'].map((id) => PRODUCTS.find((p) => p.id === id)!);
  protected readonly waUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola Sedientos! 👅')}`;
}
