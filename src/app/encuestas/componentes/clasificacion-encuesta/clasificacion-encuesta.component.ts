import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clasificacion-encuesta',
  templateUrl: './clasificacion-encuesta.component.html',
  styleUrls: ['./clasificacion-encuesta.component.css']
})
export class ClasificacionEncuestaComponent implements OnInit {

  desplegado: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  alternarDesplegar(){
    this.desplegado = !this.desplegado
  }

}
