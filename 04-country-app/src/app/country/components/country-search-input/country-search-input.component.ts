import { Component, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
    
    placeholder = input<string>('Buscar');
    value = output<string>();

    onSearch(searchValue: string){
        if(!searchValue) return;

        this.value.emit(searchValue); 
    }
}
