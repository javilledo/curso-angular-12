import { asNativeElements, Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){

    const valorBuscado = this.txtBuscar.nativeElement.value;

    if(valorBuscado.trim().length === 0){ return; }
    
    this.gifsService.buscarGifs(valorBuscado);
    
    this.txtBuscar.nativeElement.value = '';

  }

  constructor(private gifsService: GifsService){

  }

}
