export class Person {
    // public name: string;
    // private addres: string;

    // no hace falta definir las variables y se puede hacer dierectamente en el constructor.
    // Incluso se puede incluir valores por defecto
    constructor(public name: string, private addres: string = 'No Addres'){
        this.name = name;
        this.addres = addres;
    }
}

export class Hero extends Person{
    constructor(
        public alterEgo: string,
        public age: number,
        public realname: string,
    ){
        super(realname, 'New York');
    }
}

//const ironman = new Person('Ironman', 'New York');
const ironman = new Hero('Ironman', 45,'Tony');

export class HeroComposicion {
        
    constructor(
        public alterEgo: string,
        public age: number,
        public realname: string,
        public person: Person,
    ){
        this.person = new Person(realname);
    }
}


const tony = new Person('Tony Stark', 'New York');
const ironman2 = new HeroComposicion('Ironman', 45,'Tony', tony);

console.log(ironman);
console.log(ironman2);