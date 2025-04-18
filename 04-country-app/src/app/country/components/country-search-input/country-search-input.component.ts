import { Component, effect, EventEmitter, input, linkedSignal, output, Output, signal } from '@angular/core';

@Component({
    selector: 'country-search-input',
    imports: [],
    templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

    placeholder = input<string>('Buscar');
    debounceTime = input(1000);
    initialValue = input<string>('');

    value = output<string>();

    inputValue = linkedSignal<string>(() => this.initialValue());

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
