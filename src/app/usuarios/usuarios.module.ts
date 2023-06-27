import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PaginaCrearUsuarioComponent } from './paginas/pagina-crear-usuario/pagina-crear-usuario.component';


@NgModule({
  declarations: [
    PaginaCrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
