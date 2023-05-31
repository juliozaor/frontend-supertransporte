import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaCategorizacionComponent } from './paginas/pagina-categorizacion/pagina-categorizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaginaCategorizacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategorizacionModule { }
