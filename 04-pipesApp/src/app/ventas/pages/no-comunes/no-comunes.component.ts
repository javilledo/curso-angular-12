import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent  {

  // i18nSelect
  public nombre: string = 'Fernando';
  public genero: string = 'masculino';
  public invitationMap: { [key: string]: string; } = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }  
  public cambiarCliente(){
    switch (this.nombre){
      case 'Fernando': 
        this.nombre = 'Susana';
        this.genero = 'femenino';
        break;
      case 'Susana':
        this.nombre = 'Fernando';
        this.genero = 'masculino';
        break;
      default:
        break;
    }
  }

  // i18nPlural
  public clientes: string[] = ['Maria', 'Pedro', 'Hernando', 'Eduardo', 'Fernando'];
  public clientesMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    'other': 'tenemos # clientes esperando'
  };
  public borrarCliente(){
    this.clientes.pop();
  }

  // KeyValues Pipe

  public persona = {
    nombre: 'Fernando',
    edad: 35,
    direccion: 'Ottawa, Canadá'
  }

  // JSON Pipe
  heroes = [
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre: 'Robin',
      vuela: false
    },
    {
      nombre: 'Aquaman',
      vuela: false
    },

  ]

  // Async Pipe
  miObservable = interval(1000)
  valorPromesa = new Promise((resolve) => {
    setTimeout(()=>{resolve('Tenemos data de promesa');}, 3500)});





}
