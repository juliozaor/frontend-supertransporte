import { Component, OnInit } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { ErrorAutorizacion } from 'src/app/errores/ErrorAutorizacion';

@Component({
  selector: 'app-pagina-categorizacion',
  templateUrl: './pagina-categorizacion.component.html',
  styleUrls: ['./pagina-categorizacion.component.css']
})
export class PaginaCategorizacion implements OnInit {
  usuario: Usuario

  constructor(private localStorage: ServicioLocalStorage){
    const usuario = this.localStorage.obtenerUsuario()
    if(!usuario){
      throw new ErrorAutorizacion()
    }
    this.usuario = usuario
  }

  ngOnInit(): void {
    
  }
}
