import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

interface Marcador {
  marker?: mapboxgl.Marker,
  color: string,
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999;
      }

      li {
        cursor: pointer;
      }
    
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  public zoomLevel: number = 15;
  public mapa!: mapboxgl.Map;
  public center: [number, number] = [-0.281504, 39.567501];

  // Array de marcadores
  public marcadores: Marcador[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // PUEDE DEFINIRSE EL TIPO DE MARCADOR CON UN HTML, PASÁNDOSELO COMO OBJETO
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo!';

    // const marker = new mapboxgl.Marker({
    //   // element: markerHtml
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa)

    this.leerLocalStorage();

  }



  public irMarcador( marker: mapboxgl.Marker ){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  public agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat( this.center )
      .addTo( this.mapa )

    this.marcadores.push( {
      marker: nuevoMarcador,
      color: color
    } );

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })

  }

  public guardarMarcadoresLocalStorage(){

    const langLatArr: Marcador[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      langLatArr.push({
        color: m.color,
        centro: [lng, lat]
      })

    })

    localStorage.setItem('marcadores', JSON.stringify(langLatArr))
  }

  public leerLocalStorage(){

    if ( !localStorage.getItem('marcadores')){ return; }

    const lgnLatArr: Marcador[] = JSON.parse(localStorage.getItem('marcadores')!);

    // lgnLatArr.forEach( el => {
    //   const lngLat = new mapboxgl.LngLat(el.centro![0],el.centro![1])
    //   const nuevoMarcador = this.marcadores.push({
    //     color: el.color,
    //     marker: new mapboxgl.Marker({
    //         draggable: true,
    //         color: el.color
    //       })
    //         .setLngLat( lngLat )
    //         .addTo( this.mapa )
    //   })
    // })

    lgnLatArr.forEach( m => {
      
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.centro! )
        .addTo( this.mapa )

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })

    })
  };

  public borrarMarcador( i: number ){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }


}

