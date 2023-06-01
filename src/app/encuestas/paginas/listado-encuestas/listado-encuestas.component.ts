import { Component, OnInit } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { Rol } from 'src/app/autenticacion/modelos/Rol';
import { EncuestasService } from '../../servicios/encuestas.service';
import { ResumenReporte } from '../../modelos/ResumenReporte';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorizacionService } from 'src/app/categorizacion/servicios/categorizacion.service';

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
    private servicioCategorizacion: CategorizacionService,
    private servicioLocalStorage: ServicioLocalStorage, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    this.rol = this.servicioLocalStorage.obtenerRol()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) =>{
        console.log('obteniendo parametros')
        this.idEncuesta = Number(params['idEncuesta'])
        this.servicioCategorizacion.informacionCategorizacion(this.idEncuesta).subscribe({
          next: ( informacion )=>{
            console.log('obteniendo información', informacion)
            if(!informacion.categorizado && informacion.encuestaCategorizable){
              this.router.navigateByUrl('/administrar/categorizacion')
              return;
            }
            this.obtenerEncuestas(this.idEncuesta!)
          }
        })
      }
    })
  }

  obtenerEncuestas(idEncuesta: number){
    this.idEncuesta = idEncuesta
    this.servicioEncuestas.obtenerEncuestas(this.usuario!.usuario, this.idEncuesta).subscribe({
      next: ( respuesta )=>{
        this.reportes = respuesta.reportadas
      }
    })
  }

}
