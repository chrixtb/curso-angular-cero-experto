interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger =  {
    name: 'Fernando',

}

const passenger2: Passenger =  {
    name: 'Melissa',
    children: ['Natalia', 'Elizabeth']
}

const printChildren =  (passenger: Passenger): number => {
    const howManyChildren = passenger.children?.length || 0;

    // La admiración es para decirle a typescript que el valor de children está siempre porque nosotros sabemos que es así.
    //const howManyChildren = passenger.children!.length;

    console.log(passenger.name, howManyChildren);

    return howManyChildren;
};

printChildren(passenger1);
printChildren(passenger2);
