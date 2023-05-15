import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IniciarSesionRespuesta } from '../modelos/IniciarSesionRespuesta';
import { PeticionRecuperarContrasena } from '../modelos/PeticionRecuperarContrasena';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private urlBackend: string
  headers: HttpHeaders;
  public readonly llaveTokenLocalStorage = 'jwt'
  public readonly llaveUsuarioLocalStorage = 'Usuario'
  public readonly llaveRolesLocalStorage = 'rol'


  constructor(private clientHttp:HttpClient) {
    this.urlBackend = environment.urlBackend
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  public iniciarSesion(documento:string, clave:string):Observable<IniciarSesionRespuesta>{
    const endpoint = '/api/v1/autenticacion/inicio-sesion/empresa'
    return this.clientHttp.post<IniciarSesionRespuesta>(`${this.urlBackend}${endpoint}`, {usuario: documento, contrasena: clave})
  }

  public recuperarContraseña(informacionUsuario:PeticionRecuperarContrasena): Observable<string>{
    const endpoint = '/api/v1/envio-email'
    return this.clientHttp.post<string>(`${this.urlBackend}${endpoint}`, informacionUsuario,)
  }

  public cerrarSesion(){
    localStorage.removeItem(this.llaveUsuarioLocalStorage)
    localStorage.removeItem(this.llaveTokenLocalStorage)
    localStorage.removeItem(this.llaveRolesLocalStorage)
  }

  public guardarInformacionInicioSesion(jwt:string, rol:object, Usuario: object):void{
    console.log('Guardando Información de inicio de sesión')
    console.log('Nuevo token', jwt)
    localStorage.setItem(this.llaveTokenLocalStorage, jwt),
    localStorage.setItem(this.llaveRolesLocalStorage, JSON.stringify(rol))
    localStorage.setItem(this.llaveUsuarioLocalStorage, JSON.stringify(Usuario))

  }
}
