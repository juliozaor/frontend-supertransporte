import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Encuesta } from '../../modelos/Encuesta';
import { ClasificacionEncuestaComponent } from '../clasificacion-encuesta/clasificacion-encuesta.component';
import { Respuesta } from '../../modelos/Respuesta';
import { EncuestasService } from '../../servicios/encuestas.service';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  @Input('camposDeVerificacion') camposDeVerificacion: boolean = false
  @ViewChildren('clasificacion') clasificaciones!: QueryList<ClasificacionEncuestaComponent>
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('contenedorEncuesta') contenedorEncuesta!: ElementRef
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

/*   exportarPDF(){
    const pdf = new jsPDF('p', 'pt', 'a4')
    pdf.html(this.contenedorEncuesta.nativeElement, {
      callback: function (pdf) {
        pdf.save();
      },
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.5
      }
   });
  } */

  exportarPDF(){
    window.print()
  }


}
