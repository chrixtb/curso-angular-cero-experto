const name: string = 'String';

let hpPoints: number | string = 95;
hpPoints = 'FULL'

let hpPoints2: number | 'FULL' = 95;
hpPoints2 = 'FULL';
// hpPoints2 = 'Hola Mundo'; -> Error porque solo admite el string FULL

const isAlive: boolean = true;

console.log({
    name, hpPoints, isAlive
});

export {}