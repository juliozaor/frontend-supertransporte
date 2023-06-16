import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaAsignacionComponent } from './paginas/pagina-asignacion/pagina-asignacion.component';
import { AsignacionesRoutingModule } from './asignaciones-routing.module';



@NgModule({
  declarations: [
    PaginaAsignacionComponent
  ],
  imports: [
    CommonModule,
    AsignacionesRoutingModule
  ],
  exports: [
    PaginaAsignacionComponent
  ]
})
export class AsignacionesModule { }
