import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

    private http = inject(HttpClient);

    private baseUrl = "https://restcountries.com/v3.1";

    private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    get regions(): string[] {
        return [...this._regions];
    }

    getCountriesByRegion(region: string): Observable<Country[]>{
        if(!region) return of([]);

        console.log('Cargando países de la región: ', region);

        const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
        return this.http.get<Country[]>(url);
    }

    getCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
        if(!alphaCode) return of(null);

        const url = `${this.baseUrl}/alpha/${alphaCode}`;
        return this.http.get<Country>(url)
           // .pipe(
                //map( countries => countries.length > 0 ? countries[0] : null )
                //map( countries => countries[0] )
            //);
    }

    getCountryBordersByCodes(borders: string[]): Observable<Country[]> {
        // TODO por hacer
        return of([]);
    }
}
