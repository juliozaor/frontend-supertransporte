import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaCategorizacion } from './paginas/pagina-categorizacion/pagina-categorizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioModalidadRadioOperacionComponent } from './componentes/formulario-modalidad-radio-operacion/formulario-modalidad-radio-operacion.component';
import { TipoCategoriaComponent } from './componentes/tipo-categoria/tipo-categoria.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { SelectorCantidadComponent } from './componentes/selector-cantidad/selector-cantidad.component';



@NgModule({
  declarations: [
    PaginaCategorizacion,
    FormularioModalidadRadioOperacionComponent,
    TipoCategoriaComponent,
    CategoriaComponent,
    SelectorCantidadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategorizacionModule { }
