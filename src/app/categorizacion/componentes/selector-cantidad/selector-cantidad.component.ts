import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector-cantidad',
  templateUrl: './selector-cantidad.component.html',
  styleUrls: ['./selector-cantidad.component.css']
})
export class SelectorCantidadComponent implements OnInit, AfterViewInit {
  @Output('nuevoValor')                 nuevoValor: EventEmitter<number>
  @Output('nuevoValorEspecial') nuevoValorEspecial: EventEmitter<{ valor: number, fila: number }>
  @Input('estado') estado!                        : boolean
  @Input('fila') fila!                            : number
  @Input('columna') columna!                      : number
  @Input('idFila') idFila!                        : number
  @Input('idColumna') idColumna!                  : number
  @Input('valor') valor                           : number | null =  SelectorCantidadComponent.VALOR_POR_DEFECTO
  habilitado: boolean = true

  static readonly VALOR_POR_DEFECTO = 0
  static readonly VALOR_MINIMO = 0

  constructor(){
    this.nuevoValor = new EventEmitter<number>();
    this.nuevoValorEspecial = new EventEmitter<{ valor: number, fila: number }>();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.nuevoValorEspecial.emit({fila: this.fila, valor: this.valor!})
    }, 60)
  }

  ngOnInit(): void {
    if(!this.valor){
      this.valor = SelectorCantidadComponent.VALOR_POR_DEFECTO
    }
  }

  manejarCambio(valor: number){
    if(this.valorValido(valor)){
      this.valor = valor;
    }
    else{
      this.valor = SelectorCantidadComponent.VALOR_POR_DEFECTO;
    }
    this.nuevoValor.emit(this.valor);
    this.nuevoValorEspecial.emit({fila: this.fila, valor: this.valor})
  }

  valorValido(valor: number): boolean{
    if( valor < SelectorCantidadComponent.VALOR_MINIMO || !valor )
      return false;
    else
      return true;
  }
}
