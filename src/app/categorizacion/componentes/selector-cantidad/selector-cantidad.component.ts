import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector-cantidad',
  templateUrl: './selector-cantidad.component.html',
  styleUrls: ['./selector-cantidad.component.css']
})
export class SelectorCantidadComponent implements OnInit, AfterViewInit {
  @Output('valor') nuevoValor: EventEmitter<number>
  @Output('valorEspecial') nuevoValorEspecial: EventEmitter<{ valor: number, fila: number }>
  @Input('totalizable') totalizable!: boolean
  @Input('estado') estado!: boolean
  @Input('fila') fila!: number
  @Input('columna') columna!: number
  @Input('idFila') idFila!: number
  @Input('idColumna') idColumna!: number
  @Input('valor') valor: number | null =  SelectorCantidadComponent.VALOR_POR_DEFECTO
  habilitado: boolean = true

  static readonly VALOR_POR_DEFECTO = 0
  static readonly VALOR_MINIMO = 0

  constructor(){
    this.nuevoValor = new EventEmitter<number>();
    this.nuevoValorEspecial = new EventEmitter<{ valor: number, fila: number }>();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      if(this.totalizable){
        this.nuevoValorEspecial.emit({fila: this.idFila, valor: this.valor!})
      }
      
    }, 60)
  }

  ngOnInit(): void {
    if(!this.valor){
      this.valor = SelectorCantidadComponent.VALOR_POR_DEFECTO
    }
    if(!this.totalizable || !this.estado){
      /* this.establecerHabilitado(false) */
    }
  }

  manejarCambio(valor: number){
    if(this.valorValido(valor)){
      this.cambiarValor(valor)
    }
    else{
      this.cambiarValor(SelectorCantidadComponent.VALOR_POR_DEFECTO)
    }
  }

  valorValido(valor: number): boolean{
    if( valor < SelectorCantidadComponent.VALOR_MINIMO || !valor )
      return false;
    else
      return true;
  }

  cambiarValor(valor: number){
    this.valor = valor;
    this.nuevoValor.emit(this.valor);
    if(this.totalizable){
      this.nuevoValorEspecial.emit({fila: this.idFila, valor: this.valor})
    }
  }

  establecerHabilitado(habilitado: boolean){
    this.habilitado = habilitado
    if(this.idColumna === 11 && this.idFila === 27){
      console.log(this, habilitado)
    }
  }
}
