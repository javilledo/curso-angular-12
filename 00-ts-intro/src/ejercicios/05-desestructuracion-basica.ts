
interface Reproductor{
    volumen: number,
    segundo: number,
    cancion: string,
    detalles: Detalles
}

interface Detalles{
    autor: string,
    anio: number
}

const reproductor: Reproductor = {
    volumen: 90,
    segundo: 36,
    cancion: 'Mess',
    detalles:{
        autor: 'Ed Sheeran',
        anio: 2015
    }
}

//Este código siguiente es válido pero es muy dificil de leer, ya que la forma de los dos puntos
//en TS normalmente es para definir el tipo, salvo en este caso
//autorDetalle sería la variable creada para luego usarla
// const {volumen, segundo, cancion, detalles:{autor: autorDetalle}} = reproductor;
const {volumen, segundo, cancion, detalles} = reproductor;
const {autor} = detalles;

console.log('El volumen actual es de: ', volumen)
console.log('El segundo actual es de: ', segundo)
console.log('La canción actual es de: ', cancion)
console.log('El autor es: ', autor)

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

const [personaje1, personaje2, personaje3] = dbz

console.log('Personaje 1: ', personaje1);
console.log('Personaje 2: ', personaje2);
console.log('Personaje 3: ', personaje3);
