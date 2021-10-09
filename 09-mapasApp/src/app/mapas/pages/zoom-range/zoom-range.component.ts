import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        right: 50px;
        z-index: 999;
      }
    
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  public zoomLevel: number = 15;
  public mapa!: mapboxgl.Map;
  public center: [number, number] = [-0.281504, 39.567501];


  constructor() {}

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (e) => {
      this.zoomLevel = e.target.getZoom();
    });

    this.mapa.on('zoomend', (e) => {
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18)
      }
    });

    // Movimiento del mapa
    this.mapa.on('move', (e) => {
      const { lng, lat } = e.target.getCenter()
      this.center = [lng, lat]
    })

  }

  public zoomIn(){
    this.mapa.zoomIn();
  }

  public zoomOut(){
    this.mapa.zoomOut();
  }

  public zoomCambio( valor: string ){
    this.mapa.zoomTo( Number(valor) );
    console.log(valor)
  }

  // ES BUENA PRÁCTICA CERRAR LOS LISTENERS ABIERTOS
  // (en este caso concreto, como la instancia del mapa se crea
  // cada vez que se entra al componente, no tiene tanto sentido)
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

}
