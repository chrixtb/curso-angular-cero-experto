import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.iterface';
import { Country } from '../../interfaces/country.interface';
import { CountryMapper } from '../../mappers/country.mapper';
import { map } from 'rxjs';


@Component({
    selector: 'app-by-capital-page',
    imports: [CountryListComponent, CountrySearchInputComponent],
    templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

    countryService = inject(CountryService);

    isLoading = signal(false);
    isError = signal<string|null>(null);
    countries = signal<Country[]>([])

    searchedCountries = signal('');

    onSearch(query: string){

        this.searchedCountries.update(current => query)

        this.countryService.searchByCapital(query)
        .subscribe({
            next: (countries) => {
                this.isLoading.set(false);
                this.countries.set(countries);
            },
            error: (err) => {
                this.isLoading.set(false);
                this.countries.set([]);
                this.isError.set(err)
            }
        })

        this.countryService.searchByCapital(query)
            .subscribe( (countries) => {
                this.isLoading.set(false);
                this.countries.set(countries);

                console.log(countries)
            });
        
    }
}
