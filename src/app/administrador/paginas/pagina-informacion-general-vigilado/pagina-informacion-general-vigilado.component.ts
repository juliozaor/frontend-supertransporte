import { Component } from '@angular/core';
import { ServicioUsuarios } from '../../servicios/usuarios.service';
import { InfoSistemaVigia } from '../../modelos/usuarios/InfoSistemaVigia';

@Component({
  selector: 'app-pagina-informacion-general-vigilado',
  templateUrl: './pagina-informacion-general-vigilado.component.html',
  styleUrls: ['./pagina-informacion-general-vigilado.component.css']
})
export class PaginaInformacionGeneralVigiladoComponent {
  informacion?: InfoSistemaVigia

  constructor(private servicioUsuarios: ServicioUsuarios){}

  obtenerInfoSistemaVigia(documentoUsuario: string){
    this.servicioUsuarios.obtenerInformacionSistemaVigia(documentoUsuario).subscribe({
      next: (info) =>{
        this.informacion = info
      }
    })
  }
}
