import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../servicios/encuestas.service';
import { Encuesta } from '../../modelos/Encuesta';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';

@Component({
  selector: 'app-pagina-encuesta',
  templateUrl: './pagina-encuesta.component.html',
  styleUrls: ['./pagina-encuesta.component.css']
})
export class PaginaEncuestaComponent implements OnInit {
  usuario?: Usuario | null
  encuesta?: Encuesta
  idVigilado?: string
  idUsuario: string
  idEncuesta?: number
  soloLectura: boolean = true

  constructor(
    private servicioEncuesta: EncuestasService, 
    private servicioLocalStorage: ServicioLocalStorage, 
    private activeRoute: ActivatedRoute
  ) {
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    const rol = this.servicioLocalStorage.obtenerRol()
    this.idUsuario = this.usuario!.usuario
    this.activeRoute.queryParams.subscribe({
      next: (qs) => {
        this.idVigilado = qs['vigilado']
      }
    })
    this.activeRoute.params.subscribe({
      next: (parametros)=>{
        this.idEncuesta = parametros['idEncuestaDiligenciada']
        this.servicioEncuesta.obtenerEncuesta(this.idUsuario, this.idVigilado!, this.idEncuesta!).subscribe({
          next: ( encuesta )=>{
            console.log(encuesta)
            this.encuesta = encuesta
            this.soloLectura = encuesta.tipoAccion === 1 ? true : false
          }
        })
      }
    }) 
    
  }

  ngOnInit(): void {
    /* this.encuesta = this.servicioEncuesta.obtenerEncuesta() */
  }

}
