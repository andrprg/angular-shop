import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rub',
  standalone: true
})
export class RubPipe implements PipeTransform {

  transform(price: number): string {
    return price + ' ₽';
  }

}
