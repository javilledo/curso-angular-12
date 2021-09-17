import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  public initForm = {
    producto: '',
    precio: 0,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  // public guardar(miFormulario:NgForm){
  //   console.log(miFormulario.value)
  // }

  public guardar(){
    console.log(this.miFormulario);
    console.log('Posteo correcto');
    this.miFormulario.resetForm({
      producto:'',
      precio:0,
      existencias: 0
    });
  }

  public nombreNoValido(): boolean {
    return this.miFormulario?.controls.producto?.invalid && 
      this.miFormulario?.controls.producto?.touched;
  }

  public precioNoValido(): boolean {
    return this.miFormulario?.controls.precio?.touched
      && this.miFormulario?.controls.precio?.value < 0;
  }

}
