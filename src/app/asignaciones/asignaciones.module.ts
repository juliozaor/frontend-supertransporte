import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaAsignacionComponent } from './paginas/pagina-asignacion/pagina-asignacion.component';
import { AsignacionesRoutingModule } from './asignaciones-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { AlertasModule } from '../alertas/alertas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaginaAsignacionComponent
  ],
  imports: [
    CommonModule,
    AsignacionesRoutingModule,
    PipesModule,
    AlertasModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginaAsignacionComponent
  ]
})
export class AsignacionesModule { }
