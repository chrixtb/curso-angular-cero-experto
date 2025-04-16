import { Component, Input } from '@angular/core';

@Component({
    selector: 'country-list',
    imports: [],
    templateUrl: './country-list.component.html',
})
export class CountryListComponent {

    @Input() countries: string = '';

}
 