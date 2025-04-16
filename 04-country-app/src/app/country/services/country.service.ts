import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.iterface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);

    private queryCacheCapital = new Map<string, Country[]>();
    private queryCacheCountry = new Map<string, Country[]>();
    private queryCacheRegion = new Map<string, Country[]>();

    constructor() { }

    searchByCapital(query: string) :Observable<Country[]>{
        const lowerCaseQuery = query.toLowerCase();
        console.log(`Emitiendo valor ${query}`)
        //return of([]);

        if(this.queryCacheCapital.has(query)){
            return of(this.queryCacheCapital.get(query) ?? []);
        }

        console.log('Llegando al servidor')

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`)
            .pipe(
                map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
                tap( contries => this.queryCacheCapital.set(query, contries)),
                catchError( error => {
                    console.log('Error fetching ', error);

                    return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
                })
            );

    }

    searchByCountry(query: string) :Observable<Country[]>{
        const lowerCaseQuery = query.toLowerCase();
        const url = `${API_URL}/name/${lowerCaseQuery}`

        console.log(`Emitiendo valor ${lowerCaseQuery}`)

        if(this.queryCacheCountry.has(query)){
            return of(this.queryCacheCountry.get(query) ?? []);
        }

        console.log('Llegando al servidor')

        return this.http.get<RESTCountry[]>(url)
            .pipe(
                map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
                // Para simular que tarda el servicio
                delay(1500),
                tap( contries => this.queryCacheCountry.set(query, contries)),
                catchError( error => {
                    console.log('Error fetching ', error);

                    return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
                })
            );

    }

    searchByRegion(region: string) : Observable<Country[]> {
        const url = `${API_URL}/region/${region}`;

        console.log(`Emitiendo valor ${region}`)

        if(this.queryCacheRegion.has(region)){
            return of(this.queryCacheRegion.get(region) ?? []);
        }

        console.log('Llegando al servidor')

        return this.http.get<RESTCountry[]>(url).pipe(
            map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
            tap( contries => this.queryCacheRegion.set(region, contries)),
            catchError( error => {
                console.log('Error fetching ', error);

                return throwError(()=> new Error(`No se pudo obtener paises para la region ${region}`));
            })
        );
    }

    searchByAlphaCode(code: string) {
        const url = `${API_URL}/alpha/${code}`
        
        return this.http.get<RESTCountry[]>(url).pipe(
            map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
            map( contries => contries.at(0)),
            catchError( error => {
                console.log('Error fetching ', error);

                return throwError(()=> new Error(`No se pudo obtener paises con el codigo ${code}`));
            })
        );
    }

}
