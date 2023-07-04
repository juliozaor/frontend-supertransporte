import { Component, OnInit, ViewChild } from '@angular/core';
import { EncuestasService } from '../../servicios/encuestas.service';
import { Encuesta } from '../../modelos/Encuesta';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { EncuestaComponent } from '../../componentes/encuesta/encuesta.component';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

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

  exportarPDF(){
    this.componenteEncuesta.exportarPDF()
  }

  exportarExcel(){
    if(!this.idReporte){
      this.popup.abrirPopupFallido('No se pudo exportar el reporte.', 'No se ha asignado un reporte para exportar.')
      return;
    }
    this.servicioEncuesta.exportarExcel(this.idReporte).subscribe({
      next: (response)=>{
        console.log(response)
        saveAs(response, 'datos.xlsx')
      },
      error: ()=>{
        this.popup.abrirPopupFallido('Ocurrio un error inesperado.', 'Intentalo más tarde.')
      }
    })
  }

  private extractFilenameFromContentDisposition(contentDisposition: string): string {
    const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = regex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return '';
  }

  guardarEncuesta(){
    this.componenteEncuesta.guardarRespuestas()
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
        this.componenteEncuesta.resaltarRespuestasInvalidas(error.error.faltantes)
        this.popup.abrirPopupFallido('Formulario inválido', error.error.mensaje)
      }
    })
  }

}
