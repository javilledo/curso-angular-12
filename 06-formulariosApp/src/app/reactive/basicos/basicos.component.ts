import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   producto: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(0),
  //   existencias: new FormControl(0)
  // });

  miFormulario: FormGroup = this.fb.group({
    producto: [ , [Validators.required, Validators.minLength(3)]],
    precio: [ , [Validators.required, Validators.min(0)]],
    existencias: [ , [Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(){
    this.miFormulario.reset({
      producto: 'RTX 4080ti',
      precio: 1000
    })
  }

  public campoNoValido( campo: string ){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  public guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.controls)
    this.miFormulario.reset();
  }



}
