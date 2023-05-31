import { Component, OnInit } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { Rol } from 'src/app/autenticacion/modelos/Rol';
import { EncuestasService } from '../../servicios/encuestas.service';
import { ResumenReporte } from '../../modelos/ResumenReporte';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-encuestas',
  templateUrl: './listado-encuestas.component.html',
  styleUrls: ['./listado-encuestas.component.css']
})
export class ListadoEncuestasComponent implements OnInit {
  usuarioCategorizado: boolean = true
  encuestaCategorizable: boolean = true
  usuario: Usuario | null
  rol: Rol | null
  reportes: ResumenReporte[] = []
  vigilado?: string
  idEncuesta?: number

  constructor(
    private servicioEncuestas: EncuestasService, 
    private servicioLocalStorage: ServicioLocalStorage, 
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    this.rol = this.servicioLocalStorage.obtenerRol()
  }

  ngOnInit(): void {
    if(!this.usuarioCategorizado && this.encuestaCategorizable){
      // redireccion
      return;
    }
    this.obtenerEncuestas(1)
  }

  obtenerEncuestas(idEncuesta: number){
    return this.activatedRoute.params.subscribe({
      next: (params) =>{
        this.idEncuesta = Number(params['idEncuesta'])
        this.servicioEncuestas.obtenerEncuestas(this.usuario!.usuario, this.idEncuesta).subscribe({
          next: ( respuesta )=>{
            this.reportes = respuesta.reportadas
          }
        })
      }
    })
  }

}
