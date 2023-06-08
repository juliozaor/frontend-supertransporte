import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Encuesta } from '../../modelos/Encuesta';
import { ClasificacionEncuestaComponent } from '../clasificacion-encuesta/clasificacion-encuesta.component';
import { Respuesta } from '../../modelos/Respuesta';
import { RespuestaEnviar } from '../../modelos/RespuestaEnviar';
import { EncuestasService } from '../../servicios/encuestas.service';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  @Input('encuesta') encuesta!: Encuesta
  @Input('idReporte') idReporte!: number
  @Input('idEncuesta') idEncuesta!: number
  @Input('idVigilado') idVigilado!: string
  @Input('soloLectura') soloLectura: boolean = true
  @ViewChildren('clasificacion') clasificaciones!: QueryList<ClasificacionEncuestaComponent>
  @ViewChild('popup') popup!: PopupComponent
  respuestas: Respuesta[] = []
  
  constructor(private servicioEncuestas: EncuestasService, private router: Router) { }

  ngOnInit(): void {
  }

  guardarRespuestas(){
    this.servicioEncuestas.guardarRespuesta(this.idReporte, { respuestas: this.obtenerRespuestas() }).subscribe({
      next: ( respuesta ) =>{
        this.popup.abrirPopupExitoso(respuesta.mensaje)
        this.router.navigate(['/administrar','encuestas', this.idEncuesta])
      },
      error: (error: HttpErrorResponse) =>{
        this.popup.abrirPopupFallido('Error', error.error.message)
      }
    })

  }

  obtenerRespuestas(): Respuesta[]{
    this.respuestas = []
    this.clasificaciones.forEach(clasificacion => {
      this.respuestas = [ ...this.respuestas, ...clasificacion.obtenerRespuestas()]
    })
    return this.respuestas
  }


}
