import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../servicios/encuestas.service';
import { Encuesta } from '../../modelos/Encuesta';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-encuesta',
  templateUrl: './pagina-encuesta.component.html',
  styleUrls: ['./pagina-encuesta.component.css']
})
export class PaginaEncuestaComponent implements OnInit {
  encuesta?: Encuesta
  idVigilado: string
  idUsuario: string
  idEncuesta?: number
  soloLectura: boolean = true

  constructor(
    private servicioEncuesta: EncuestasService, 
    private servicioLocalStorage: ServicioLocalStorage, 
    private activeRoute: ActivatedRoute
  ) {
    const usuario = this.servicioLocalStorage.obtenerUsuario()
    const rol = this.servicioLocalStorage.obtenerRol()
    this.idUsuario = usuario!.usuario
    if(rol && rol.id === '003'){
      this.idVigilado = usuario!.usuario
      /* this.idVigilado = '111' */
    }else{
      this.idVigilado = '111'
    }
    this.activeRoute.params.subscribe({
      next: (parametros)=>{
        this.idEncuesta = parametros['idEncuestaDiligenciada']
        this.servicioEncuesta.obtenerEncuesta(this.idUsuario, this.idVigilado, this.idEncuesta!).subscribe({
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
