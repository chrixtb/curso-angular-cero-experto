import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
    name: 'heroFilter',
})
export class HeroFilterPipe implements PipeTransform {

    transform(value: Hero[], searchQuery: string): Hero[] {
        if(!searchQuery) return value;

        searchQuery = searchQuery.toLocaleLowerCase();
        return value.filter(hero => hero.name.toLocaleLowerCase().includes(searchQuery));
    }

}
