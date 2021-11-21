import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  public get usuario() : Usuario {
    return {...this._usuario} 
  }

  constructor(private http: HttpClient) { }

  public registro(name: string, email: string, password: string){

    const url = `${this.baseUrl}/auth/new`;
    const body = {
      name,
      email,
      password
    }

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => {
        if(resp.ok){
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );

  }

  public login(email: string, password: string): Observable<any>{

    const url = `${this.baseUrl}/auth`;
    const body = {
      email,
      password
    }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  };

  public validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );

  }

  public logout(){
    localStorage.clear();
  }

}
