import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-busqueda',
  templateUrl: './input-busqueda.component.html',
  styleUrls: ['./input-busqueda.component.css']
})
export class InputBusquedaComponent implements OnInit {
  @Output('AlEscribir') AlEscribir: EventEmitter<string>
  @Output('AlCambiar') AlCambiar: EventEmitter<string>
  constructor() {
    this.AlEscribir = new EventEmitter<string>();
    this.AlCambiar = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  manejarAlEscribir(texto: string){
    this.AlEscribir.emit(texto)
  }

  manejarAlCambiar(texto: string){
    this.AlCambiar.emit(texto)
  }

}
