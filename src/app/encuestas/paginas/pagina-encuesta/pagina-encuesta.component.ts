import { Component, OnInit, ViewChild } from '@angular/core';
import { EncuestasService } from '../../servicios/encuestas.service';
import { Encuesta } from '../../modelos/Encuesta';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { EncuestaComponent } from '../../componentes/encuesta/encuesta.component';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-encuesta',
  templateUrl: './pagina-encuesta.component.html',
  styleUrls: ['./pagina-encuesta.component.css']
})
export class PaginaEncuestaComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('componenteEncuesta') componenteEncuesta!: EncuestaComponent
  usuario?: Usuario | null
  encuesta?: Encuesta
  idVigilado?: string
  idReporte?: number
  idUsuario: string
  idEncuesta?: number
  soloLectura: boolean = true

  constructor(
    private servicioEncuesta: EncuestasService, 
    private servicioLocalStorage: ServicioLocalStorage, 
    private activeRoute: ActivatedRoute
  ) {
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    const rol = this.servicioLocalStorage.obtenerRol()
    this.idUsuario = this.usuario!.usuario
    this.activeRoute.queryParams.subscribe({
      next: (qs) => {
        this.idVigilado = qs['vigilado']
        this.idReporte = Number(qs['reporte'])
      }
    })
    this.activeRoute.params.subscribe({
      next: (parametros)=>{
        this.idEncuesta = parametros['idEncuestaDiligenciada']
        this.servicioEncuesta.obtenerEncuesta(this.idVigilado!, this.idEncuesta!, this.idReporte!).subscribe({
          next: ( encuesta )=>{
            console.log(encuesta)
            this.encuesta = encuesta
            this.soloLectura = encuesta.tipoAccion === 1 ? true : false
          }
        })
      }
    }) 
    
  }

  ngOnInit(): void {
    /* this.encuesta = this.servicioEncuesta.obtenerEncuesta() */
  }

  enviarEncuesta(){
    if(!this.idEncuesta || !this.idReporte || !this.idVigilado){
      this.popup.abrirPopupFallido('Error', 'Faltan datos de la encuesta, el reporte o el vigilado')
      return;
    }
    this.servicioEncuesta.enviarRespuesta(this.idEncuesta, this.idReporte,  this.idVigilado).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso('Formulario enviado', 'El formulario se ha enviado correctamente.')
      },
      error: (error: HttpErrorResponse)=>{
        this.popup.abrirPopupFallido('Formulario inválido', error.error.mensaje)
      }
    })
  }

}
