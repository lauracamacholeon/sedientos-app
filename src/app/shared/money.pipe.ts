import { Pipe, PipeTransform } from '@angular/core';
import { money } from '../services/cart.service';

/** {{ 7000 | money }} → $7.000 */
@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  transform(value: number): string {
    return money(value);
  }
}
