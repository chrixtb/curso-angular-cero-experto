/*
    ===== Código del Ejercicio =====
    Implementar interfac que defina el objeto SuperHero
*/
interface Addres{
    street: string;
    country: string;
    city: string;
}

interface SuperHero{
    name: string;
    age: number;
    address: Addres;
    showAddress: () => String;
}

/*
    ===== Fin codigo ejercicio =====
*/

const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        street: 'Main St',
        country: 'USA',
        city: 'NY'
    },
    showAddress() {
        return this.name + ', ' + this.address.city + ', ' + this.address.country;
    }
}


const address = superHeroe.showAddress();
console.log( address );




export {};