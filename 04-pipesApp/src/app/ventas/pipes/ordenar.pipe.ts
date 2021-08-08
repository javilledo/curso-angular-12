import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/ventas.interfaces';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(heroes: Heroe[], orderBy: string = 'sin valor'): Heroe[] {

    switch ( orderBy ){

      case 'sin valor':
        heroes = heroes;
        break;

      case 'nombre':
        heroes = heroes.sort((a,b) => (a.nombre > b.nombre)? 1 : -1);
        break;

      case 'vuela':
        heroes = heroes.sort((a,b) => (a.vuela > b.vuela)? 1 : -1);
        break;

      case 'color':
        heroes = heroes.sort((a,b) => (a.color > b.color)? 1 : -1);
        break;
      
    }

    return heroes;

  }

}
