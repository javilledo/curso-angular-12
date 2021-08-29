import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor( private http: HttpClient) { }

  public verificaAutenticacion(): Observable<boolean> { 
    if(!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/${localStorage.getItem('token')}`)
                    .pipe(
                      map(auth => {
                        this._auth = auth;
                        return true
                      }
                      )
                    )
  }

  public login(): Observable<Auth>{
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(auth=>this._auth = auth),
      tap(auth => localStorage.setItem('token', auth.id))
    )
  }

  public logout(): void {
    this._auth = undefined;
  }

}
