import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pregunta } from '../../modelos/Encuesta';
import { Respuesta } from '../../modelos/Respuesta';

@Component({
  selector: 'app-pregunta-encuesta',
  templateUrl: './pregunta-encuesta.component.html',
  styleUrls: ['./pregunta-encuesta.component.css']
})
export class PreguntaEncuestaComponent implements OnInit {
  @Output('valorModificado') valorModificado: EventEmitter<Respuesta>
  @Input('pregunta') pregunta!: Pregunta
  @Input('soloLectura') soloLectura: boolean = true
  valor: string = ""
  documento: File | undefined
  clasesRespuestas = {}
  
  constructor() { 
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

  emitirValorModificado(){
    this.valorModificado.emit({
      preguntaId: this.pregunta.idPregunta,
      valor: this.valor,
      documento: this.documento,
      nombreArchivo: this.documento ? this.documento.name : undefined
    })
  }

}
