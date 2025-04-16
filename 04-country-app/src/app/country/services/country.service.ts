import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.iterface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);

    constructor() { }

    searchByCapital(query: string) :Observable<Country[]>{
        const lowerCaseQuery = query.toLowerCase();

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`)
            .pipe(
                map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
                catchError( error => {
                    console.log('Error fetching ', error);

                    return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
                })
            );

    }

    searchByCountry(query: string) :Observable<Country[]>{
        const lowerCaseQuery = query.toLowerCase();

        return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerCaseQuery}`)
            .pipe(
                map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
                // Para simular que tarda el servicio
                delay(1500),
                catchError( error => {
                    console.log('Error fetching ', error);

                    return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
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
