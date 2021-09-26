import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {



  public miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [
      Validators.required, 
      Validators.pattern(this.validatorService.emailPattern)
    ],
    [
      this.emailValidator
    ]
    ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required ]],
  }, {
    validators: [
      this.validatorService.camposIguales('password', 'password2')
    ]
  }
  )

  get emailErrorMsg(){
    
    const emailErrors = this.miFormulario.get('email')?.errors;

    if ( emailErrors?.required ) { return 'El campo es obligatorio' }
    if ( emailErrors?.pattern ) { return 'El valor ingresado no tiene formato de e-mail' }
    if ( emailErrors?.emailTomado ) { return 'El e-mail introducido ya fue tomado' }

    return '';
    
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
    ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Javier Lledo',
      email: 'test1@test.com',
      username: 'javilledo',
      password: '123456',
      password2: '123456'
    })
  }

  public campoNoValido ( campo:string ){
    return this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched;
  }

  // public emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required &&
  //     this.miFormulario.get('email')?.touched;  
  // }

  // public emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern &&
  //     this.miFormulario.get('email')?.touched;  
  // }

  // public emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado &&
  //     this.miFormulario.get('email')?.touched;  
  // }


  public submitFormulario(){
    console.log(this.miFormulario.value)
    this.miFormulario.markAllAsTouched
  }

}
