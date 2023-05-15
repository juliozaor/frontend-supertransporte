import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paginacion } from '../modelos/compartido/Paginacion';
import { PeticionActualizarUsuarioEmpresa } from '../modelos/usuarios/PeticionActualizarUsuarioEmpresa';
import { PeticionRegistrarUsuarioEmpresa } from '../modelos/usuarios/PeticionRegistrarUsuarioEmpresa';
import { UsuarioEmpresa } from '../modelos/usuarios/usuarioEmpresa';
import { Autenticable } from './compartido/Autenticable';
import { PeticionActualizarContrasena } from '../../autenticacion/modelos/PeticionActualizarContrasena';
import { usuarioNovafianza } from '../modelos/usuarios/usuarioNovafianza';
import { PeticionActualizarUsuario } from '../modelos/ConfiguracionPerfil/PeticionActualizarUsuario';
import { Cargo } from '../modelos/usuarios/Cargo';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarios extends Autenticable {
  private urlBackend:string
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    super()
    this.urlBackend = environment.urlBackend
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.obtenerTokenAutorizacion()}`
    })
  }

  obtenerUsuariosEmpresaPorEmpresa(pagina: number, limite: number, idEmpresa: string): Observable<{usuariosEmpresa: UsuarioEmpresa[], paginacion:Paginacion}> {
    const endpoint = `/api/v1/usuario_empresa/listar-entidad/${idEmpresa}/${pagina}/${limite}`
    return this.httpClient.get<{usuariosEmpresa: UsuarioEmpresa[], paginacion:Paginacion}>(`${this.urlBackend}${endpoint}`, { headers: this.headers });
  }

  obtenerUsuariosEmpresa(pagina: number, limite: number): Observable<{usuariosEmpresa: UsuarioEmpresa[], paginacion:Paginacion}> {
    const endpoint = `/api/v1/usuario_empresa/listar/${pagina}/${limite}`
    return this.httpClient.get<{usuariosEmpresa: UsuarioEmpresa[], paginacion:Paginacion}>(`${this.urlBackend}${endpoint}`, { headers: this.headers });
  }

  obtenerUsuarioEmpresaPorId(usuariosEmpresa_id: string): Observable<UsuarioEmpresa>{
    const endpoint = `/api/v1/usuario_empresa/${usuariosEmpresa_id}`;
    return this.httpClient.get<UsuarioEmpresa>(`${this.urlBackend}${endpoint}`, {headers: this.headers});
  }

  obtenerUsuarioEmpresaPorUsuario(nombreUsuario: string): Observable<UsuarioEmpresa>{
    const endpoint = `/api/v1/usuario_empresa/usuario/${nombreUsuario}`;
    return this.httpClient.get<UsuarioEmpresa>(`${this.urlBackend}${endpoint}`, {headers: this.headers});
  }

  obtenerUsuarioNovafianzaPorUsuario(nombreUsuario: string): Observable<usuarioNovafianza>{
    const endpoint = `/api/v1/usuario_novafianza/usuario/${nombreUsuario}`;
    return this.httpClient.get<usuarioNovafianza>(`${this.urlBackend}${endpoint}`, {headers: this.headers});
  }


  registrarUsuarioEmpresa(usuarioEmpresa: PeticionRegistrarUsuarioEmpresa): Observable<void>{
    const endpoint = `/api/v1/usuario_empresa/registro`
    return this.httpClient.post<void>(`${this.urlBackend}${endpoint}`, usuarioEmpresa, {headers: this.headers})
  }

  public ActualizarUsuarioEmpresa(usuariosEmpresa_id:string, usuarioEmpresa:PeticionActualizarUsuarioEmpresa): Observable<string>{
    const endpoint = `/api/v1/usuario_empresa/${usuariosEmpresa_id}`;
    return this.httpClient.patch<string>(`${this.urlBackend}${endpoint}`, usuarioEmpresa, {headers: this.headers})
  }

  public ActualizarContraseñaUsuario(usuarioEmpresa:PeticionActualizarContrasena): Observable<string>{
    const endpoint = `/api/v1/autenticacion/cambiar-clave`;
    return this.httpClient.post<string>(`${this.urlBackend}${endpoint}`, usuarioEmpresa, {headers: this.headers})
  }

  public cambiarEstadoUsuarioEmpresa(usuariosEmpresa_id:string):Observable<any>{
    const endpoint = `/api/v1/usuario_empresa/estado/${usuariosEmpresa_id}`
    return this.httpClient.put<any>(`${this.urlBackend}${endpoint}`, undefined, {headers: this.headers})
  }

  public actualizarUsuario(peticionActualizarUsuario:PeticionActualizarUsuario, usuario:string):Observable<any>{
    const endpoint = `/api/v1/usuarios/${usuario}`
    return this.httpClient.patch<string>(`${this.urlBackend}${endpoint}`, peticionActualizarUsuario, {headers: this.headers})
  }

  public obtenerCargos(){
    const endpoint = `/api/v1/cargos`
    return this.httpClient.get<Cargo[]>(`${this.urlBackend}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.obtenerTokenAutorizacion()}`
      }
    })
  }
}
