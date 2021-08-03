import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'M1DOF2wWjlSyGCU8gBCkDR9AX7QSZWai';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))

      localStorage.setItem('ultimaBusqueda', query);

    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=M1DOF2wWjlSyGCU8gBCkDR9AX7QSZWai&q=jurassic park&limit=10')
    // .then(resp =>{
    //   resp.json().then((resp) =>{console.log(resp)});
    // })

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`, {params})
    .subscribe((resp:SearchGifsResponse) =>{
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    })
  }

  constructor(private http: HttpClient){
    // this._historial = localStorage.getItem('historial');
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

}
