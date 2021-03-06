import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li{
      cursor: pointer
    }
    `

  ]
})
export class PorPaisComponent {

  public termino: string = '';

  public hayError: boolean = false;
  
  public paises: Country[]= [];

  public paisesSugeridos: Country[] = []

  public mostrarSugerencias: boolean = false;

  public buscar(termino: string){
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
    .subscribe((paises) => {
      this.paises = paises;
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }

  public sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
    .subscribe((paises) => this.paisesSugeridos = paises.splice(0, 5),
    (err) => this.paisesSugeridos = []);

  }

  public buscarSugerido(termino: string){
    this.buscar(termino);
    this.mostrarSugerencias = false;
  }

  constructor(private paisService: PaisService){}

}
