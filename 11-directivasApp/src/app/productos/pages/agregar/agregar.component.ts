import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {

  public texto1: string = 'El campo es obligatorio (texto1)';
  public color: string = 'blue';

  public miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required]
  })

  constructor( private fb: FormBuilder) { }

  public tieneError( campo: string ): boolean {
    return this.miFormulario.get(campo)?.invalid || false;
  }

  public cambiarNombre(){
    this.texto1 = Math.random().toString();
  }

  public cambiarColor(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.color = color;
  }

}
