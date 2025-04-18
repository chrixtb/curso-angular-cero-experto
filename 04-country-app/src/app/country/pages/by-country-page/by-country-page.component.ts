import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    activatedeRoute = inject(ActivatedRoute);
    router = inject(Router);

    queryParam = this.activatedeRoute.snapshot.queryParamMap.get('query') ?? '';
    query = linkedSignal(() => this.queryParam);


    countryResource = rxResource({
        request: () => ({ query: this.query()}),
        loader: ({ request }) => {
            if(!request.query) {
                this.router.navigate(['/country/by-country']);
                return of([]);
            }

            this.router.navigate(['/country/by-country'], {
                queryParams: {
                    query: request.query,
                },
            });

            return this.countryService.searchByCountry(request.query);
        },
    });

}
