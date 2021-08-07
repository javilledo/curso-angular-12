import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public nombre: string = 'fernando herrera';
  public valor: number = 1000;
  public obj: Object = {
    'nombre': 'Fernando',
  }

  public mostrarNombre(): void{
    console.log(this.valor)
  }

  constructor(private primengConfig: PrimeNGConfig){}

  ngOnInit(){
    this.primengConfig.ripple = true;
  }
}
