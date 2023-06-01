import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CategoriaClasificacion, CategoriaClasificacionFila } from '../../modelos/Categorizacion';
import { SelectorCantidadComponent } from '../selector-cantidad/selector-cantidad.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Output('cambioTotal') cambioTotal: EventEmitter<number>
  @Input('categoria') categoria!: CategoriaClasificacion
  @ViewChildren('fila') filas!: QueryList<ElementRef<HTMLElement>>
  @ViewChildren('selector') selectores!: QueryList<SelectorCantidadComponent>
  total: number = 0
  especial = false
  hayInconsistencia = false
  clases: any
  
  constructor(){
    this.cambioTotal = new EventEmitter<number>()
    
  }

  ngAfterViewChecked(): void {}

  ngOnInit(): void {
    this.especial = this.categoria.id === 4 ? true : false;
    this.clases = {
      'invalido': this.hayInconsistencia
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
  }

  calcularTotalEspecial(){
    let nuevoTotal = 0;
    this.selectores.forEach( selector => {
      if(selector.columna === 0){
        nuevoTotal+= selector.valor ?? 0
      }
    })
    this.total = nuevoTotal;
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
    }else{
      let nuevoTotal = 0
      this.categoria.filas.forEach( fila => {
        fila.datos.forEach( dato => {
          nuevoTotal+= dato.valor? +dato.valor : 0;
        })
      })
      this.total = nuevoTotal
    }
  }

  informarEstado(hayInconsistencia: boolean){
    this.hayInconsistencia = hayInconsistencia
    this.clases.invalido = hayInconsistencia
  }
}
