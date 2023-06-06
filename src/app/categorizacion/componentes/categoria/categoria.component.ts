import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CategoriaClasificacion, CategoriaClasificacionFila, Dato } from '../../modelos/Categorizacion';
import { SelectorCantidadComponent } from '../selector-cantidad/selector-cantidad.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Output('cambioTotal') cambioTotal: EventEmitter<number>
  @Input('categoria') categoria!: CategoriaClasificacion
  @ViewChildren('selector') selectores!: QueryList<SelectorCantidadComponent>
  total: number = 0
  especial = false
  hayInconsistencia = false
  esIgualACero = false
  clases: any
  
  constructor(){
    this.cambioTotal = new EventEmitter<number>()
  }

  ngAfterViewChecked(): void {}

  ngOnInit(): void {
    this.especial = this.categoria.id === 4 ? true : false;
    this.clases = {
      'invalido': this.hayInconsistencia || this.esIgualACero
    }
    this.calcularTotalInicial()
  }

  ngAfterViewInit(): void {}

  calcularTotal(){
    if(this.especial){
      this.calcularTotalEspecial()
    }else{
      this.calcularTotalGenerico()
    }
    this.cambioTotal.emit(this.total)
  }

  calcularTotalGenerico(){
    let nuevoTotal = 0;
    this.selectores.forEach( selector => {
      nuevoTotal+= selector.valor ?? 0
    })
    this.total = nuevoTotal;
    if(this.total === 0){
      this.esIgualACero = true
      this.actualizarClasesTablaTotal()
    }else{
      this.esIgualACero = false
      this.actualizarClasesTablaTotal()
    }; 
  }

  calcularTotalEspecial(){
    let nuevoTotal = 0;
    this.selectores.forEach( selector => {
      if(selector.columna === 0){
        nuevoTotal+= selector.valor ?? 0
      }
    })
    this.total = nuevoTotal;
    if(this.total === 0){
      this.esIgualACero = true
      this.actualizarClasesTablaTotal()
    }else{
      this.esIgualACero = false
      this.actualizarClasesTablaTotal()
    }; 
    this.cambioTotal.emit(this.total)
  }

  calcularTotalInicial(){
    if(this.especial){
      let nuevoTotal = 0
      this.categoria.filas.forEach( ( fila ) => {
        fila.datos.forEach( (dato, index) => {
          if(index = 0){
            nuevoTotal+= dato.valor? +dato.valor : 0;
          }
        })
      })
      this.total = nuevoTotal
      if(this.total === 0){
        this.esIgualACero = true
        this.actualizarClasesTablaTotal()
      }else{
        this.esIgualACero = false
        this.actualizarClasesTablaTotal()
      }; 
    }else{
      let nuevoTotal = 0
      this.categoria.filas.forEach( fila => {
        fila.datos.forEach( dato => {
          nuevoTotal+= dato.valor? +dato.valor : 0;
        })
      })
      this.total = nuevoTotal
      if(this.total === 0){
        this.esIgualACero = true
        this.actualizarClasesTablaTotal()
      }else{
        this.esIgualACero = false
        this.actualizarClasesTablaTotal()
      }; 
    }
  }

  informarEstado(hayInconsistencia: boolean){
    this.hayInconsistencia = hayInconsistencia
    this.actualizarClasesTablaTotal()
  }

  obtenerDatos(): Dato[]{
    const datos: Dato[] = []
    this.selectores.forEach( selector =>{
      let dato: Dato = {
        idColumna: selector.idColumna,
        idFila: selector.idFila,
        valor: selector.valor!.toString()
      }
      datos.push(dato)
    })
    return datos
  }

  manejarNuevoValorEspecial({valor, fila}:{ valor: number, fila: number }){
    if(!this.especial){
      return;
    }
    this.selectores.forEach( selector => {
      if(selector.columna !== 0 && selector.fila === fila){
        if(valor <= 0){
          selector.habilitado = false
        }else{
          selector.habilitado = true
        }
      }
    })
  }

  actualizarClasesTablaTotal(){
    this.clases = {
      'invalido': this.hayInconsistencia || this.esIgualACero
    }
  }
}
