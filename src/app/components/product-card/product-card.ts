import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Product } from '../../data/models';
import { DAYS, ScheduleService } from '../../services/schedule.service';
import { UiService } from '../../services/ui.service';
import { ProductVisual } from '../../shared/cup';
import { Icon } from '../../shared/icon';
import { MoneyPipe } from '../../shared/money.pipe';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductVisual, Icon, MoneyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly big = input(false);

  private readonly ui = inject(UiService);
  private readonly schedule = inject(ScheduleService);

  protected readonly fromPrice = computed(() => Math.min(...this.product().sizes.map((s) => s.price)));

  /** Mensaje cuando no se puede pedir hoy (agotado o promo de otro día). */
  protected readonly blocked = computed(() => {
    const p = this.product();
    if (p.available === false) return 'Agotado';
    if (!this.schedule.isAvailableToday(p.days)) {
      return 'Disponible ' + p.days!.map((d) => DAYS[d].toLowerCase()).join(' y ');
    }
    return null;
  });

  open() {
    if (!this.blocked()) this.ui.openProduct(this.product());
  }
}
