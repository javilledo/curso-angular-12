import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: ['.form-check-label, .form-check-input {cursor:pointer;}']
})
export class SwitchesComponent  {

  public persona = {
    genero: 'F',
    notificaciones: true
  }

  public terminosYCondiciones: boolean = false;


}
