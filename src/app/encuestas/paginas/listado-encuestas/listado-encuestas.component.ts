import { Component, OnInit } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { Rol } from 'src/app/autenticacion/modelos/Rol';
import { EncuestasService } from '../../servicios/encuestas.service';
import { ResumenReporte } from '../../modelos/ResumenReporte';

@Component({
  selector: 'app-listado-encuestas',
  templateUrl: './listado-encuestas.component.html',
  styleUrls: ['./listado-encuestas.component.css']
})
export class ListadoEncuestasComponent implements OnInit {
  usuario: Usuario | null
  rol: Rol | null
  reportes: ResumenReporte[] = []
  idEncuesta = 1

  constructor(private servicioEncuestas: EncuestasService, private servicioLocalStorage: ServicioLocalStorage) { 
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    this.rol = this.servicioLocalStorage.obtenerRol()
  }

  ngOnInit(): void {
    this.servicioEncuestas.obtenerEncuestas(this.usuario!.usuario, this.idEncuesta).subscribe({
      next: ( respuesta )=>{
        this.reportes = respuesta.reportadas
      }
    })
  }

}
