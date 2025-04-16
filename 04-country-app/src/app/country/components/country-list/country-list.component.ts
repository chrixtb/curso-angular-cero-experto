import { Component, input, Input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.iterface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'country-list',
    imports: [DecimalPipe],
    templateUrl: './country-list.component.html',
})
export class CountryListComponent {

    countries = input.required<Country[]>();

}
 