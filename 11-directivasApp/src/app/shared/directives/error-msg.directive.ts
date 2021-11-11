import { Directive, OnInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges {

  private _color: string = 'red';
  private _mensaje: string = 'Este campo es obligatorio'

  public htmlElement: ElementRef<HTMLElement>;
  
  @Input() set color( valor: string ){
    this._color = valor;
    this.setColor();
  }

  @Input() set mensaje( valor: string ){
    this._mensaje = valor;
    this.setMensaje();
  }

  @Input() set mostrar( valor: boolean ){
    if( !valor ){
      this.htmlElement.nativeElement.classList.add('hidden');
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  // @Input() mensaje: string = 'Este campo es obligatorio';

  constructor( private el: ElementRef<HTMLElement> ) {
    
    this.htmlElement = el;

   }

  ngOnInit(): void {

    this.setColor();
    this.setMensaje();
    this.setClass();

  }

  ngOnChanges( changes: SimpleChanges ): void {

    // console.log( changes );

    // if( changes.mensaje ){
    //   const mensaje = changes.mensaje.currentValue;
    //   this.htmlElement.nativeElement.innerText = this.mensaje;
    // }

    // if( changes.color ){
    //   const color = changes.color?.currentValue;
    //   this.htmlElement.nativeElement.style.color = this.color;
    // }

  }

  public setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  public setClass(): void {
    this.htmlElement.nativeElement.classList.add('form-text');
  }

  public setMensaje(): void {
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }

}
