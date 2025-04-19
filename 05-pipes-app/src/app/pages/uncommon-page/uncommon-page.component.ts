import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
    name: 'Fernando',
    gender: 'male',
    age: 25,
    address: '123 Main St, Cityville',
}

const client2 = {
    name: 'Nuria',
    gender: 'female',
    age: 33,
    address: 'Toronto, Canadá',
}
@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {


    client = signal(client1);

    invitationMap = {
        male: 'invitarlo',
        female: 'invitarla',
    }

    changeClient() {
        if(this.client().name === client1.name) {
            this.client.set(client2);
            return;
        }
        this.client.set(client1);
    }


    //  I18N Plural Pipe
    clientsMap = signal({
        '=0': 'no tenemos ningún cliente esperando',
        '=1': 'tenemos un cliente esperando',
        '=2': 'tenemos dos clientes esperando',
        'other': 'tenemos # clientes esperando',
    });

    clients = signal([
        'Maria',
        'Pedro',
        'Juan',
        'Fernando',
        'Nuria',
        'Luis',
        'Ana',
    ]);

    deleteClient() {
        this.clients.update((clientes) => clientes.slice(1));
    }

    //  KeyValue Pipe

    profile = signal({
        name: 'Fernando',
        age: 25,
        address: '123 Main St, Cityville',
    });

    // Async Pipe

    promiseValue : Promise<string> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Tenemos datos en la promesa');
            console.log('Promesa resuelta');
        }, 3500);
    });

    myObservableTimer = interval(1000).pipe(
        tap((value) => console.log('tap', value))
    );
}
