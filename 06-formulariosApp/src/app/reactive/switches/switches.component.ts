import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: ['.form-check-label, .form-check-input {cursor:pointer;}']
})
export class SwitchesComponent implements OnInit {

  public miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [false, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  public persona = {
    genero: 'F',
    notificaciones: true
  }

  public guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    this.persona = formValue;
  }

  constructor( private fb: FormBuilder) { }

  ngOnInit(){
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    })
    // con setValue, si el FormGroup no recibe todas las variables, da error.
    // con reset, se modifican las variables que se envían, sin errores.

    // Se puede subscribir a los cambios del formulario
    this.miFormulario.valueChanges.subscribe( ({condiciones, ...restoDeArgumentos}) => { // desestructuración para separar un campo, en restoDeArgumentos van el resto
      // delete form.condiciones;
      this.persona = restoDeArgumentos;
    });

    // También se puede subscribir a los cambios de un campo del formulario
    this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
      console.log(newValue)
    });

  }


}
