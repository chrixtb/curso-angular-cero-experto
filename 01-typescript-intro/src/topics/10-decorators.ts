// es necesario añadir al fichero tsconfig.json esta opcion: "experimentalDecorators": true
// esto es para la forma de decoradores antiguos. Typescript 5 soporta una nueva forma de definir decoradores

function classDecorator<T extends { new(...args: any[]): {} }>(
    constructor: T
){
    return class extends constructor {
        newProperty = 'New Property';
        hello = 'override'; 
    };
}


@classDecorator
export class SuperClass {
    public myProperty: string = 'Abc123';

    print() {
        console.log('Hola Mundo');
    }
}

console.log(SuperClass);

const myClass = new SuperClass(); 
console.log(myClass);