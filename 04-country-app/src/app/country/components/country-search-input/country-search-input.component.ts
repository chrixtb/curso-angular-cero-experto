import { Component, effect, EventEmitter, input, output, Output, signal } from '@angular/core';

@Component({
    selector: 'country-search-input',
    imports: [],
    templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
    
    placeholder = input<string>('Buscar');
    value = output<string>();
    debounceTime = input(300);

    inputValue = signal<string>('')

    debounceEffect = effect((onCleanup) => {
        const value = this.inputValue();

        const timeout = setTimeout(()=> {
            this.value.emit(value);
        }, this.debounceTime());

        onCleanup( () => {
            clearTimeout(timeout);
        });
    });

    onSearch(searchValue: string){
        if(!searchValue) return;

        this.value.emit(searchValue); 
    }
}
