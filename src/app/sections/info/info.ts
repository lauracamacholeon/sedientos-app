import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CONFIG } from '../../data/menu';
import { DAYS, fmtHour, ScheduleService } from '../../services/schedule.service';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  protected readonly schedule = inject(ScheduleService);
  protected readonly config = CONFIG;

  // Lunes primero, domingo al final.
  protected readonly rows = [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const h = CONFIG.schedule[d];
    return { day: d, name: DAYS[d], hours: h ? `${fmtHour(h[0])} – ${fmtHour(h[1])}` : 'Cerrado' };
  });
}
