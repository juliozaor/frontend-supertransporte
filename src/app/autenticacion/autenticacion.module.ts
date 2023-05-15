import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HttpClientModule } from '@angular/common/http'
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopupComponent } from './componentes/popup/popup.component';
import { ModalRecuperacionContrasenaComponent } from './componentes/modal-recuperacion-contrasena/modal-recuperacion-contrasena.component';
import { ActualizarContrasenaComponent } from './componentes/actualizar-contrasena/actualizar-contrasena.component';


@NgModule({
  declarations: [
    InicioSesionComponent,
    ModalRecuperacionContrasenaComponent,
    PopupComponent,
    ActualizarContrasenaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxCaptchaModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ]
})
export class AutenticacionModule { }
