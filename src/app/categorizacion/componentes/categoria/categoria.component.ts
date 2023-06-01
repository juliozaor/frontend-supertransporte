import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CategoriaClasificacion } from '../../modelos/Categorizacion';
import { SelectorCantidadComponent } from '../selector-cantidad/selector-cantidad.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit {
  @Input('categoria') categoria!: CategoriaClasificacion
  @ViewChildren('selectores') selectores!: QueryList<SelectorCantidadComponent>
  total: number = 0

  ngOnInit(): void {
    this.calcularTotalInicial()
  }

  ngAfterViewInit(): void {
    
  }

  calcularTotal(){
    console.log('calculando total')
    let nuevoTotal = 0;
    this.selectores.forEach( selector => {
      console.log('selector valor', selector.valor)
      nuevoTotal+= selector.valor ?? 0
    })
    this.total = nuevoTotal;
  }

  calcularTotalInicial(){
    let nuevoTotal = 0
    this.categoria.filas.forEach( fila => {
      fila.datos.forEach( dato => {
        nuevoTotal+= dato.valor? +dato.valor : 0;
      })
    })
    this.total = nuevoTotal
  }
}
