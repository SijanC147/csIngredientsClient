import { Pipe, PipeTransform } from '@angular/core';
import { Nutrient } from '../../_models/ingredient.model';

@Pipe({
  name: 'nutrientAmount'
})
export class NutrientAmountPipe implements PipeTransform {

  transform(value: Nutrient, ...args: unknown[]): string {
    if (!value || typeof value === 'undefined')
      return "-"
    const { amount, unit } = value;
    return `${amount}${unit}`;
  }

}
