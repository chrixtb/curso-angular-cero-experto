import { RESTCountry } from './../interfaces/rest-countries.iterface';
import { Country } from "../interfaces/country.interface";

export class CountryMapper {

    static mapRestCountryToCountry( restCountry :RESTCountry): Country{

        return {
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? restCountry.name.common,
            capital: restCountry.capital.join(','),
            population: restCountry.population
        }
    }

    static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[]) : Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }
}