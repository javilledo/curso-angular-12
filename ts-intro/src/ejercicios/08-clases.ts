
class PersonaNormal{

    constructor(
        public nombre: string,
        public direccion: string
    ){}
}

class Heroe extends PersonaNormal {
    // alterEgo: string;
    // edad: number;
    // nombreReal: string;

    // imprimirNombre(){
    //     return this.alterEgo + ' ' + this.nombreReal;
    // }

    constructor(
        public alterEgo: string, 
        public edad: number, 
        public nombreReal: string
    ){
        super(nombreReal, 'New York, USA');
    }

}

// interface Personaje2 {
//     alterEgo?: string;
//     edad?: number;
//     nombreReal?: string;

//     imprimirNombre: () => string;

// }

const ironman = new Heroe('Ironman', 45, 'Tony');
// const spiderman: Personaje2 = {}

console.log(ironman);