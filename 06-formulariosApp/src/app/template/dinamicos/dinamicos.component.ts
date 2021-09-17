import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  @ViewChild('miFormulario') miFormulario!:NgForm;

  public persona: Persona = {
    nombre: 'Javi',
    favoritos: [
      {
        id: 1,
        nombre: 'Metal Gear'
      },
      {
        id: 2,
        nombre: 'Jurassic Park'
      }
    ]
  }

  public nuevoJuego: string = '';

  public guardar(){
    console.log(this.miFormulario)
  }

  public eliminar(index: number){
    this.persona.favoritos.splice(index, 1);
  }

  public agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1, //ojo que con esta lógica pueden duplicarse ids
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  public campoNoValido(){
    return this.miFormulario?.controls.persona?.value == null ||
          this.miFormulario?.controls.persona?.value == '';
  }

}
