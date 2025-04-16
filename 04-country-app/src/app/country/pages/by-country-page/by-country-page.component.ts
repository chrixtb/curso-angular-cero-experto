import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-by-country-page',
    imports: [CountryListComponent, CountrySearchInputComponent],
    templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
    countryService = inject(CountryService);

    query = signal('');

    countryResource = rxResource({
        request: () => ({ query: this.query()}),
        loader: ({ request }) => {
            if(!request.query) return of([]);

            return this.countryService.searchByCountry(request.query);
        },
    });

}
