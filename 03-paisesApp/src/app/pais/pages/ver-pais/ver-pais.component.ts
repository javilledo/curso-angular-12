import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  public pais!: Country; //OJO al !, que es para que TS nos permita no inicializarlo

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    //OPCIÓN CON SWITHMAP
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log) //Es lo que ejecuta con la respuesta
      )
      .subscribe(pais => {
        this.pais = pais;        
      })

    //OPCIÓN CON DOS OBSERVABLES ENCADENADOS
    // this.activatedRoute.params
    // .subscribe(({id}) =>{ //desestructuración, con las llaves se saca directamente un parámetro de la respuesta
    //   this.paisService.getPaisPorAlpha(id).subscribe(pais =>{
    //     console.log(pais);
    //   })
    // })

  }

}
