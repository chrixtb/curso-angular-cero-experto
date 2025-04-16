import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, map, of } from 'rxjs';

import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-by-capital-page',
    imports: [CountryListComponent, CountrySearchInputComponent],
    templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

    countryService = inject(CountryService);

    query = signal('');

    countryResource = rxResource({
        request: () => ({ query: this.query()}),
        loader: ({ request }) => {
            if(!request.query) return of([]);

            return this.countryService.searchByCapital(request.query);
        },
    });

    // Codigo con resources pero vamos a hacer otra impl con rxResource 
    // que en vez de trabajar con promesas trabaja con observables

    // countryResource = resource({
    //     request: () => ({ query: this.query()}),
    //     loader: async({ request }) => {
    //         if(!request.query) return [];

    //         return await firstValueFrom(this.countryService.searchByCapital(request.query));
    //     }
    // });

    // Se va a realizar una implementacion con los nuevos objetos resource de angular.
    // De aqui para abajo seria la implementacion antigua. 

    // isLoading = signal(false);
    // isError = signal<string|null>(null);
    // countries = signal<Country[]>([])

    // searchedCountries = signal('');

    // onSearch(query: string){

    //     this.searchedCountries.update(current => query)

    //     this.countryService.searchByCapital(query)
    //     .subscribe({
    //         next: (countries) => {
    //             this.isLoading.set(false);
    //             this.countries.set(countries);
    //         },
    //         error: (err) => {
    //             this.isLoading.set(false);
    //             this.countries.set([]);
    //             this.isError.set(err)
    //         }
    //     })

    //     this.countryService.searchByCapital(query)
    //         .subscribe( (countries) => {
    //             this.isLoading.set(false);
    //             this.countries.set(countries);

    //             console.log(countries)
    //         });
    // }
}
