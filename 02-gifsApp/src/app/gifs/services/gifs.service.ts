import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'M1DOF2wWjlSyGCU8gBCkDR9AX7QSZWai';

  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo correpsondiente
  public resultados: any[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=M1DOF2wWjlSyGCU8gBCkDR9AX7QSZWai&q=jurassic park&limit=10')
    // .then(resp =>{
    //   resp.json().then((resp) =>{console.log(resp)});
    // })

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    .subscribe((resp:any) =>{
      console.log(resp.data);
      this.resultados = resp.data;
    })
  }

  constructor(private http: HttpClient){}

}
