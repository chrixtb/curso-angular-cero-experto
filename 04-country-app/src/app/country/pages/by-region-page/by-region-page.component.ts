import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

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
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);

    public regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
    ];

    queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
    selectedRegion = linkedSignal<Region|null>(() => {
        if(!this.queryParam) return null;

        const region = this.regions.find((region) => region === this.queryParam);
        if(!region) return null;

        return region;
    });

    countryResource = rxResource({
        request: () => ({ region: this.selectedRegion()}),
        loader: ({ request }) => {
            if(!request.region){
                this.router.navigate(['/country/by-region']);
                return of([]);
            }

            this.router.navigate(['/country/by-region'], {
                queryParams: {
                    region: request.region,
                },
            });

            return this.countryService.searchByRegion(request.region);
        },
    });

}
