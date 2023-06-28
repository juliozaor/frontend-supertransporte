import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clasificacion } from '../../modelos/Encuesta';
import { Respuesta } from '../../modelos/Respuesta';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clasificacion-encuesta',
  templateUrl: './clasificacion-encuesta.component.html',
  styleUrls: ['./clasificacion-encuesta.component.css']
})
export class ClasificacionEncuestaComponent implements OnInit {
  @Output('preguntasRespondidas') seHanRespondidoPreguntas: EventEmitter<Respuesta[]>
  @Output('haHabidoErrorArchivo') haHabidoErrorArchivo: EventEmitter<HttpErrorResponse> 
  @Input('idVigilado') idVigilado!: string
  @Input('clasificacion') clasificacion!: Clasificacion
  @Input('soloLectura') soloLectura: boolean = true
  @Input('camposDeVerificacion') camposDeVerificacion: boolean = false
  @Input('observacion') observacion: boolean  = false
  desplegado: boolean = true
  preguntasRespondidas: Respuesta[] = [] 

  constructor() { 
    this.seHanRespondidoPreguntas = new EventEmitter<Respuesta[]>();
    this.haHabidoErrorArchivo = new EventEmitter<HttpErrorResponse>() 
  }

  ngOnInit(): void {
  }

  alternarDesplegar(){
    this.desplegado = !this.desplegado
  }

  obtenerRespuestas(): Respuesta[]{
    return this.preguntasRespondidas
  }

  emitirRespuestas(){
    this.seHanRespondidoPreguntas.emit(this.preguntasRespondidas)
  }

  agregarPreguntaRespondida(respuesta: Respuesta){
    if(this.existePreguntaRespondida(respuesta)){
      this.eliminarPreguntaRespondida(respuesta)
      this.preguntasRespondidas.push(respuesta)
    }else{
      this.preguntasRespondidas.push(respuesta)
    }
  }

  existePreguntaRespondida(respuesta: Respuesta):boolean{
    const idPreguntasRespondidas = this.preguntasRespondidas.map( preguntaRespondida => preguntaRespondida.preguntaId )
    return idPreguntasRespondidas.includes( respuesta.preguntaId ) ? true : false
  }

  eliminarPreguntaRespondida(respuesta: Respuesta): void{
    this.preguntasRespondidas = this.preguntasRespondidas.filter( preguntaRespondida => { 
      return preguntaRespondida.preguntaId !== respuesta.preguntaId ? true : false
    })
  }

  manejarErrorCargaArchivo(error: HttpErrorResponse){
    this.haHabidoErrorArchivo.emit(error)
  }

}
