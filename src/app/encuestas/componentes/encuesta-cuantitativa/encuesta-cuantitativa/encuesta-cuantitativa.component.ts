import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { DialogosEncuestas } from 'src/app/encuestas/dialogos-encuestas';
import { Formulario, Pregunta } from 'src/app/encuestas/modelos/Formulario';
import { Respuesta } from 'src/app/encuestas/modelos/Respuesta';
import { EncuestasService } from 'src/app/encuestas/servicios/encuestas.service';

@Component({
  selector: 'app-encuesta-cuantitativa',
  templateUrl: './encuesta-cuantitativa.component.html',
  styleUrls: ['./encuesta-cuantitativa.component.css']
})
export class EncuestaCuantitativaComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @Input('formularios') formularios!: Formulario[]
  @Output('tocada') hanHabidoCambios: EventEmitter<boolean>
  estadoRespuestas: Respuesta[] = [];
  hayCambios: boolean = false;
  respuestas: Respuesta[] = [];
  
  constructor(private servicio: EncuestasService){
    this.hanHabidoCambios = new EventEmitter<boolean>()
  }

  ngOnInit(): void {
    this.formularios.forEach( tab => {
      tab.subIndicador.forEach( subindicador =>{
        subindicador.preguntas.forEach( pregunta =>{
          this.estadoRespuestas.push( this.obtenerRespuesta(pregunta) )
        })
      })
    })
  }

  guardar(){
    this.servicio.guardarRespuestasIndicadores(2, this.respuestas).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso(DialogosEncuestas.GUARDAR_ENCUESTA_EXITO)
      },
      error: (error)=>{
        this.popup.abrirPopupFallido(
          DialogosEncuestas.GUARDAR_ENCUESTA_ERROR_TITULO, 
          DialogosEncuestas.GUARDAR_ENCUESTA_ERROR_DESCRIPCION
        )
      }
    })
  }

  enviar(){
    this.popup.abrirPopupExitoso(DialogosEncuestas.ENVIAR_ENCUESTA_EXITO)
  }

  manejarNuevaRespuesta(respuesta: Respuesta){
    this.agregarRespuesta(respuesta)
    this.agregarRespuestaAEstado(respuesta)
    this.setHayCambios(true)
  }

  private agregarRespuesta(respuesta: Respuesta){
    if(this.existeRespuesta(respuesta)){
      this.eliminarRespuesta(respuesta)
    }
    this.respuestas.push(respuesta)
  }
  private agregarRespuestaAEstado(respuesta: Respuesta){
    if(this.existeRespuestaEnEstado(respuesta)){
      this.eliminarRespuestaDeEstado(respuesta)
    }
    this.estadoRespuestas.push(respuesta)
  }

  private existeRespuesta(respuesta: Respuesta):boolean{
    const idPreguntasRespondidas = this.respuestas.map( preguntaRespondida => preguntaRespondida.preguntaId )
    return idPreguntasRespondidas.includes( respuesta.preguntaId ) ? true : false
  }
  private existeRespuestaEnEstado(respuesta: Respuesta):boolean{
    const idPreguntasRespondidas = this.estadoRespuestas.map( preguntaRespondida => preguntaRespondida.preguntaId )
    return idPreguntasRespondidas.includes( respuesta.preguntaId ) ? true : false
  }

  private eliminarRespuesta(respuesta: Respuesta): void{
    this.respuestas = this.respuestas.filter( preguntaRespondida => { 
      return preguntaRespondida.preguntaId !== respuesta.preguntaId ? true : false
    })
  }
  private eliminarRespuestaDeEstado(respuesta: Respuesta): void{
    this.estadoRespuestas = this.estadoRespuestas.filter( preguntaRespondida => { 
      return preguntaRespondida.preguntaId !== respuesta.preguntaId ? true : false
    })
  }

  private obtenerRespuesta(pregunta: Pregunta): Respuesta{
    return {
      preguntaId: pregunta.idPregunta,
      valor: pregunta.respuesta ?? "",
      documento: pregunta.documento,
      nombreArchivo: pregunta.nombreOriginal,
      observacion: pregunta.observacion,
      ruta: pregunta.ruta
    }
  }

  setHayCambios(tocada: boolean){
    this.hayCambios = tocada
    this.hanHabidoCambios.emit(tocada)
  }
}
