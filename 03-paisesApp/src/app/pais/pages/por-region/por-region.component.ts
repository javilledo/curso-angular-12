import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
  button{
    margin-right: 1.5px;
  }`

  ]
})
export class PorRegionComponent {

  public regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  public regionActiva: string = '';
  public paises: Country[] = [];

  activarRegion(region: string){

    if(region === this.regionActiva){return}

    this.paises = [];
    this.regionActiva = region;
    console.log(this.regionActiva)

    this.paisService.buscarRegion(region)
    .subscribe((paises) => {this.paises = paises;
    console.log(paises)});
  }


  getClaseCSS(region: string): string{
    return (region === this.regionActiva) ? 'btn-primary' : 'btn-outline-primary'
  }

  constructor(private paisService: PaisService){ }

}

