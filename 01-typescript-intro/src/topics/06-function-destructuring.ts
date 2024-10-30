export interface Product {
    description: string;
    price: number;
}

const phone: Product ={
    description: "Samsung Galaxy",
    price: 150.0
};

const tablet: Product = {
    description: "Aipad air",
    price: 250.0
}

export interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

//function taxCalculation ({productos, tax}: TaxCalculationOptions ): [number, number] -> se puede desestructurar objetos de entrada.
export function taxCalculation (options: TaxCalculationOptions ): [number, number]
{
    const {products, tax} = options;
    
    let total = 0;

    products.forEach( ({price}) => {
        total += price;
    });

    return [total, total * tax];
}


const shopingCart = [phone, tablet];
const tax = 0.15;

const [total, taxResult]  = taxCalculation({ 
    products: shopingCart,
    tax
});

console.log('Total', total)
console.log('Tax', taxResult)