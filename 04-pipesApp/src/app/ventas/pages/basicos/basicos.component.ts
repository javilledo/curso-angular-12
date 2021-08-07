import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent  {

  public nombreLower: string = 'javier';
  public nombreUpper: string = 'JAVIER';
  public nombreCompleto: string = 'jAvIEr llEdO';

  //Para manejar fechas, mejor sería moment.js
  public fecha: Date = new Date();

}
