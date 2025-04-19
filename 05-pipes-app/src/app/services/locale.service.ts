import { Injectable, signal } from '@angular/core';

export type AvailabeLocales = 'es' | 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

    private currentLocale = signal<AvailabeLocales>('es');

    constructor() {
        this.currentLocale.set(
            // no deberíamos usar as AvailabeLocales porque no es seguro.
            // Se debería validar la entrada del localStorage
            (localStorage.getItem('locale') as AvailabeLocales) ?? 'es'
        );
    }


    get getLocale() {
        return this.currentLocale();
    }

    changeLocale(locale: AvailabeLocales) {
        localStorage.setItem('locale', locale);
        this.currentLocale.set(locale);
        window.location.reload();
    }
}
