import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _apiURL: string = 'https://restcountries.eu/rest/v2'

  get httpParams(): HttpParams{
    return new HttpParams()
    .set('fields','flag;capital;name;population;alpha2Code')}

  buscarPais(termino: string): Observable<Country[]>{

    const url = `${this._apiURL}/name/${termino}`;

    return this.http.get<Country[]>(url, {params: this.httpParams});

  }

  buscarCapital(termino: string): Observable<Country[]>{

    const url = `${this._apiURL}/capital/${termino}`;

    return this.http.get<Country[]>(url, {params: this.httpParams});

  }

  getPaisPorAlpha(id: string): Observable<Country>{

    const url = `${this._apiURL}/alpha/${id}`;

    return this.http.get<Country>(url);

  }

  buscarRegion(termino: string): Observable<Country[]>{

    const url = `${this._apiURL}/region/${termino}`;

    return this.http.get<Country[]>(url, {params: this.httpParams});

  }

  constructor( private http: HttpClient) { }

}
