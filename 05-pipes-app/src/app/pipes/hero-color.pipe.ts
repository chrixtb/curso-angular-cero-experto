import { Pipe, type PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor',
})
export class HeroColorPipe implements PipeTransform {

    transform(value: Color): string {
        switch (value) {
            case Color.red:
                return 'Rojo';
            case Color.black:
                return 'Negro';
            case Color.blue:
                return 'Azul';
            case Color.green:
                return 'Verde';
        }
    }

}
