import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../servicios/encuestas.service';
import { Encuesta } from '../../modelos/Encuesta';

@Component({
  selector: 'app-pagina-encuesta',
  templateUrl: './pagina-encuesta.component.html',
  styleUrls: ['./pagina-encuesta.component.css']
})
export class PaginaEncuestaComponent implements OnInit {
  encuesta?: Encuesta

  constructor(private servicioEncuesta: EncuestasService) { }

  ngOnInit(): void {
    /* this.encuesta = this.servicioEncuesta.obtenerEncuesta() */
    this.servicioEncuesta.obtenerEncuestaTysa().subscribe({
      next: ( encuesta )=>{
        this.encuesta = encuesta
      }
    })
  }

}
