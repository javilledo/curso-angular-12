import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v2'

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[]{
    return [...this._regiones];
  }

  constructor( private http: HttpClient ) { }

  public getPaisesPorRegion ( region: string ): Observable<PaisSmall[]>{
    const url: string = `${this.baseUrl}/continent/${region}?fields=alpha3Code,name`
    return this.http.get<PaisSmall[]>(url)
  }

  public getPaisPorCodigo ( codigo: string ): Observable<Pais | null>{

    if( !codigo ){return of(null)}

    const url: string = `${this.baseUrl}/alpha/${codigo}`
    return this.http.get<Pais>(url)
  }

  public getPaisSmallPorCodigo ( codigo: string ): Observable<PaisSmall>{
    
    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=name,alpha3Code`
    return this.http.get<PaisSmall>(url)
  }

  public getPaisesPorCodigo ( borders: string [] ): Observable<PaisSmall[]> {
    
    if ( !borders ) { return of([])}

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach( (codigo) => {
      const peticion = this.getPaisSmallPorCodigo(codigo);
      peticiones.push( peticion )
    })

    return combineLatest( peticiones )

  }

}