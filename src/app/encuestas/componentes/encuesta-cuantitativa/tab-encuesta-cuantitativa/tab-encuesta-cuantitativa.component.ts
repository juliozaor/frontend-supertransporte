import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SubIndicador } from 'src/app/encuestas/modelos/Formulario';
import { Respuesta } from 'src/app/encuestas/modelos/Respuesta';

@Component({
  selector: 'app-tab-encuesta-cuantitativa',
  templateUrl: './tab-encuesta-cuantitativa.component.html',
  styleUrls: ['./tab-encuesta-cuantitativa.component.css']
})
export class TabEncuestaCuantitativaComponent implements OnInit{
  @Input('subindicadores') subindicadores: SubIndicador[] = []
  @Input('estadoRespuestas') estadoRespuestas: Respuesta[] = []
  @Output('nuevaRespuesta') nuevaRespuesta: EventEmitter<Respuesta>
  respuestas: Respuesta[] = [];

  constructor(){
    this.nuevaRespuesta = new EventEmitter<Respuesta>();
  }

  ngOnInit(): void {}

  manejarNuevaRespuesta(respuesta: Respuesta){
    this.nuevaRespuesta.emit(respuesta)
  }
}
