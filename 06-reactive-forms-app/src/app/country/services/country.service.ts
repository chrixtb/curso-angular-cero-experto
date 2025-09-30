import { combineLatest, Observable, of } from 'rxjs';
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

    getCountryByAlphaCode(alphaCode: string): Observable<Country> {
        const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
        return this.http.get<Country>(url);
    }

    getCountriesByCodeArray(countryCodes: string[]): Observable<Country[]> {
        if(!countryCodes || countryCodes.length === 0){
            console.log('No hay países para cargar' + countryCodes);
            return of([]);
        }

        const coutriesRequest: Observable<Country>[] = [];
        countryCodes.forEach((code) => {
            const request = this.getCountryByAlphaCode(code);   
            coutriesRequest.push(request);
        });

        return combineLatest(coutriesRequest);
    }
}
