import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })

  // Llenar selectores
  public regiones: string[] = [];
  public paises: PaisSmall [] = [];
  public fronteras: PaisSmall [] = [];

  public cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    // CUANDO CAMBIE LA REGIÓN
    // this.miFormulario.get('region')?.valueChanges.subscribe((region)=>{
    //   this.paisesService.getPaisesPorRegion(region).subscribe((paises)=>this.paises = paises)
    //   this.miFormulario.get('pais')?.setValue('');
    // });
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( () => {
          this.cargando = true;
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
        this.paises = paises;
        this.cargando = false;
      })
    
    // CUANDO CAMBIE EL PAÍS
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( () => {
          this.cargando = true;
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo) ),
        switchMap( pais => this.paisesService.getPaisesPorCodigo(pais?.borders!))
      )
      .subscribe( paises => {
          this.fronteras = paises;
        // this.fronteras = pais?.borders || [];
        this.cargando = false;
      })
  }

  public guardar(){
    console.log(this.miFormulario.value);
  }

}
