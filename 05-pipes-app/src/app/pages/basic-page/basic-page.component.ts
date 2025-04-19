import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailabeLocales, LocaleService } from '../../services/locale.service';

@Component({
    selector: 'app-basic-page',
    imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
    templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

    localeService = inject(LocaleService);
    currentLocale = signal(inject(LOCALE_ID));

    // Se puede usar el servicio de locale para obtener el locale actual o usar el LOCALE_ID
    //currentLocale = signal(this.localeService.getLocale);

    nameLower = signal('christian');
    nameUpper = signal('CHRISTIAN');
    fullName = signal('ChrIStian TeRRon');

    customDate = signal(new Date());

    tickingDateEffect = effect((onCleanup) => {
        const interval = setInterval(() => {
            console.log('tick');
            this.customDate.set(new Date());
        }, 1000);

        onCleanup(() => {
            clearInterval(interval);
        });
    });

    changeLocale(locale: AvailabeLocales) {
        console.log({locale});
        this.localeService.changeLocale(locale);
    }

}
