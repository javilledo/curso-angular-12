import { calculaISV, Producto } from "./06-desestructuracion-funcion";

const carritoCompras: Producto[] = [
    {
        desc: 'Teléfono 1',
        precio: 100
    },
    {
        desc: 'Teléfono',
        precio: 150
    }
];

const [total, isv] = calculaISV(carritoCompras);

console.log('Total: ', total);
console.log('ISV: ', isv);

