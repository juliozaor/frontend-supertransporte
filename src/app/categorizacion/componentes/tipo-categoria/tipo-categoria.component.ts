import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { TipoCategoria } from '../../modelos/Categorizacion';
import { CategoriaComponent } from '../categoria/categoria.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-tipo-categoria',
  templateUrl: './tipo-categoria.component.html',
  styleUrls: ['./tipo-categoria.component.css']
})
export class TipoCategoriaComponent implements AfterViewInit {
  @Input('tipoCategoria') tipoCategoria!:TipoCategoria
  @ViewChildren('categoria') categorias!: QueryList<CategoriaComponent>

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.validarTotales()
    }, 10) 
  }

  validarTotales(): boolean{
    let categoriaAnterior: CategoriaComponent | undefined
    let categoriaActual: CategoriaComponent
    console.log(this.categorias)
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
    return true
  }

  existeInconsistencia(inconsistencia: boolean){
    this.categorias.forEach( categoria => {
      categoria.informarEstado(inconsistencia)
    })
  }
}
