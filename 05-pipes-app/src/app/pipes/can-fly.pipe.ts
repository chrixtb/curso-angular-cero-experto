import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'canfly',
})
export class CanFlyPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Puede volar' : 'No puede volar';
  }

}
