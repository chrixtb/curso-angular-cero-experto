import { Component, inject, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';


@Component({
    selector: 'app-by-region-page',
    imports: [CountryListComponent],
    templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
    countryService = inject(CountryService);

    public regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
    ];

    selectedRegion = signal<Region|null>(null);

    countryResource = rxResource({
        request: () => ({ region: this.selectedRegion()}),
        loader: ({ request }) => {
            if(!request.region) return of([]);

            return this.countryService.searchByRegion(request.region);
        },
    });

}
