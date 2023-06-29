import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pregunta } from '../../modelos/Encuesta';
import { Respuesta } from '../../modelos/Respuesta';
import { ArchivosEncuestasService } from '../../servicios/archivos-encuestas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EncuestasService } from '../../servicios/encuestas.service';
import { Motivo } from '../../modelos/Motivo';

@Component({
  selector: 'app-pregunta-encuesta',
  templateUrl: './pregunta-encuesta.component.html',
  styleUrls: ['./pregunta-encuesta.component.css']
})
export class PreguntaEncuestaComponent implements OnInit {
  @Output('valorModificado') valorModificado: EventEmitter<Respuesta>
  @Output('haHabidoErrorArchivo') haHabidoErrorArchivo: EventEmitter<HttpErrorResponse> 
  @Input('idVigilado') idVigilado!: string
  @Input('pregunta') pregunta!: Pregunta
  @Input('soloLectura') soloLectura: boolean = true
  @Input('camposDeVerificacion') camposDeVerificacion: boolean = false
  @Input('justificable') justificable: boolean = false

  motivoDeshabilitado:  boolean = false
  archivoDeshabilitado: boolean = false
  invalida:             boolean = false

  motivos         : Motivo[] = []
  valoresNegativos: string[] = ["N", "NO"]

  observacion: string = ""
  valor: string = ""
  nombreOriginalDocumento?: string
  nombreDocumento?: string
  rutaDocumento?: string

  documento: File | null = null
  clasesRespuestas = {}
  
  constructor(
    private servicioArchivos: ArchivosEncuestasService,
    private servicioEncuesta: EncuestasService
  ) { 
    this.valorModificado = new EventEmitter<Respuesta>();
    this.haHabidoErrorArchivo = new EventEmitter<HttpErrorResponse>() 
  }

  ngOnInit(): void {
    this.obtenerMotivos()
    this.pregunta.respuesta ? this.establecerValor(this.pregunta.respuesta) : ""
    this.clasesRespuestas = {
      'respuesta-positiva': this.pregunta.respuesta === 'SI' && this.soloLectura,
      'respuesta-negativa': this.pregunta.respuesta === 'NO' && this.soloLectura,
    }
  }

  //Obtener recursos
  obtenerMotivos(){
    this.motivos = this.servicioEncuesta.obtenerMotivos()
  }

  //Manejadores de eventos
  alCambiarArchivo(){
    if(this.documento){
      this.guardarArchivoTemporal()
    }else{
      this.nombreDocumento = undefined
      this.nombreOriginalDocumento = undefined
      this.rutaDocumento = undefined
      this.emitirValorModificado()
    }
  }

  alCambiarRespuesta(respuesta: string){
    this.establecerValor(respuesta)
    this.emitirValorModificado()
  }

  alCambiarObservacion(){
    this.emitirValorModificado()
  }

  //Acciones
  guardarArchivoTemporal(){
    if(!this.documento){
      return;
    }
    this.servicioArchivos.guardarArchivoTemporal(this.documento, this.pregunta.idPregunta, this.idVigilado).subscribe({
      next: (archivo)=>{
        this.nombreDocumento = archivo.nombreAlmacenado
        this.nombreOriginalDocumento = archivo.nombreOriginalArchivo
        this.rutaDocumento = archivo.ruta
        this.emitirValorModificado()
      },
      error: (e: HttpErrorResponse)=>{
        this.haHabidoErrorArchivo.emit(e)
      }
    })
  }

  private emitirValorModificado(){
    this.valorModificado.emit({
      preguntaId: this.pregunta.idPregunta,
      valor: this.valor,
      documento: this.nombreDocumento,
      nombreArchivo: this.nombreOriginalDocumento,
      ruta: this.rutaDocumento,
      observacion: this.observacion
    })
  }

  marcarInvalida(){
    this.invalida = true
  }

  marcarValida(){
    this.invalida = false
  }

  //Setters

  establecerValor(valor: string){
    this.valor = valor
    if( this.valoresNegativos.includes(valor) ){
      this.establecerMotivoDeshabilitado(false)
      this.establecerArchivoDeshabilitado(true)
    }else{
      this.establecerMotivoDeshabilitado(true)
      this.establecerArchivoDeshabilitado(false)
    }
    this.emitirValorModificado()
  }

  establecerMotivoDeshabilitado(motivoDeshabilitado: boolean){
    this.motivoDeshabilitado = motivoDeshabilitado
    if(motivoDeshabilitado && this.observacion != ""){
      this.observacion = ""
    }
  }

  establecerArchivoDeshabilitado(archivoDeshabilitado: boolean){
    this.archivoDeshabilitado = archivoDeshabilitado
    if(archivoDeshabilitado && this.documento != null){
      this.documento = null
    }
  }

}
