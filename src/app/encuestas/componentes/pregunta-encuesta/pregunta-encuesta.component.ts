import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pregunta } from '../../modelos/Encuesta';
import { Respuesta } from '../../modelos/Respuesta';
import { ArchivosEncuestasService } from '../../servicios/archivos-encuestas.service';

@Component({
  selector: 'app-pregunta-encuesta',
  templateUrl: './pregunta-encuesta.component.html',
  styleUrls: ['./pregunta-encuesta.component.css']
})
export class PreguntaEncuestaComponent implements OnInit {
  @Output('valorModificado') valorModificado: EventEmitter<Respuesta>
  @Input('idVigilado') idVigilado!: string
  @Input('pregunta') pregunta!: Pregunta
  @Input('soloLectura') soloLectura: boolean = true
  valor: string = ""
  documento: File | null = null

  nombreOriginalDocumento?: string
  nombreDocumento?: string
  rutaDocumento?: string
  clasesRespuestas = {}
  
  constructor(private servicioArchivos: ArchivosEncuestasService) { 
    this.valorModificado = new EventEmitter<Respuesta>();
  }

  ngOnInit(): void {
    if(this.pregunta.respuesta){
      this.valor = this.pregunta.respuesta
    }
    this.clasesRespuestas = {
      'respuesta-positiva': this.pregunta.respuesta === 'SI' && this.soloLectura,
      'respuesta-negativa': this.pregunta.respuesta === 'NO' && this.soloLectura,
    }
  }

  alCambiarArchivo(){
    console.log('disparando funcion al cambiar archivo')
    console.log(this.documento)
    if(this.documento){
      this.guardarArchivoTemporal()
    }else{
      this.nombreDocumento = undefined
      this.nombreOriginalDocumento = undefined
      this.rutaDocumento = undefined
      this.emitirValorModificado()
    }
  }

  alCambiarRespuesta(){
    this.emitirValorModificado()
  }

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
      }
    })
  }

  private emitirValorModificado(){
    this.valorModificado.emit({
      preguntaId: this.pregunta.idPregunta,
      valor: this.valor,
      documento: this.nombreDocumento,
      nombreArchivo: this.nombreOriginalDocumento,
      ruta: this.rutaDocumento
    })
  }

}
