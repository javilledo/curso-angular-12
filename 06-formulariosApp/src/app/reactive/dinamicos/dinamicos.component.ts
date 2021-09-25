import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  public miFormulario: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array( [
      ['Metal Gear', Validators.required], //son colecciones de FormControls
      ['Death Stranding', Validators.required]
    ], Validators.required)
  });

  public nuevoFavorito: FormControl = this.fb.control('', Validators.required)

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder) { }

  public guardar(){
    if(this.miFormulario.invalid){ return; }
    this.miFormulario.markAllAsTouched;
    console.log(this.miFormulario.value)
  }

  public campoNoValido( campo: string ){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  public borrar( i: number ){
    this.favoritosArr.removeAt(i)
  }

  public agregarFavorito(){
    if (this.miFormulario.invalid){ return; }
    // ((this.miFormulario.controls.favoritos) as FormArray).push(this.nuevoFavorito)
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required))
    this.nuevoFavorito.reset();
  }

}
