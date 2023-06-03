import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Dato, TipoCategoria } from '../../modelos/Categorizacion';
import { CategoriaComponent } from '../categoria/categoria.component';

@Component({
  selector: 'app-tipo-categoria',
  templateUrl: './tipo-categoria.component.html',
  styleUrls: ['./tipo-categoria.component.css']
})
export class TipoCategoriaComponent implements AfterViewInit {
  @Input('tipoCategoria') tipoCategoria!:TipoCategoria
  @ViewChildren('categoria') categorias!: QueryList<CategoriaComponent>
  inconsistencia: boolean = false;
  total: number = 0;

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.validarTotales()
    }, 10) 
  }

  validarTotales(): boolean{
    let categoriaAnterior: CategoriaComponent | undefined
    let categoriaActual: CategoriaComponent
    for (const categoria of this.categorias) {
      categoriaActual = categoria
      if(categoriaAnterior){
        if(categoriaAnterior.total !== categoriaActual.total){
          this.existeInconsistencia(true)
          return false;
        } 
      }
      categoriaAnterior = categoriaActual
      continue;
    }
    this.existeInconsistencia(false)
    this.establecerTotal()
    return true
  }

  existeInconsistencia(inconsistencia: boolean){
    this.inconsistencia = inconsistencia;
    this.categorias.forEach( categoria => {
      categoria.informarEstado(inconsistencia)
    })
  }

  obtenerDatos(): Dato[]{
    let datos: Dato[] = []
    this.categorias.forEach( categoria => {
      datos = [...datos, ...categoria.obtenerDatos()]
    })
    return datos
  }

  establecerTotal(){
    const primeraCategoria = this.categorias.get(0)
    if(primeraCategoria){
      this.total = primeraCategoria.total
    }
  }
}
