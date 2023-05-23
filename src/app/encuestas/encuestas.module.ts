import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoEncuestasComponent } from './paginas/listado-encuestas/listado-encuestas.component';
import { InputsModule } from '../inputs/inputs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginaEncuestaComponent } from './paginas/pagina-encuesta/pagina-encuesta.component';
import { RouterModule } from '@angular/router';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { PreguntaEncuestaComponent } from './componentes/pregunta-encuesta/pregunta-encuesta.component';
import { ClasificacionEncuestaComponent } from './componentes/clasificacion-encuesta/clasificacion-encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoEncuestasComponent,
    PaginaEncuestaComponent,
    EncuestaComponent,
    PreguntaEncuestaComponent,
    ClasificacionEncuestaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InputsModule
  ]
})
export class EncuestasModule { }
