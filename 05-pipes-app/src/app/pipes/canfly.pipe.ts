import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'canfly',
})
export class CanflyPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Puede volar' : 'No puede volar';
  }

}
