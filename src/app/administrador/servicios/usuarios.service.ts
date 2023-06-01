import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autenticable } from './compartido/Autenticable';
import { InfoSistemaVigia } from '../modelos/usuarios/InfoSistemaVigia';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarios extends Autenticable {
  private readonly hostVigia = environment.urlBackendVigia

  constructor(private httpClient: HttpClient) {
    super()
  }

  obtenerInformacionSistemaVigia(documentoUsuario: string){
    const endpoint = `/api/v1/vista?documento=${documentoUsuario}`
    const t = '2c9b417a-75af-46c5-8ca0-340d3acdb3c7'
    return this.httpClient.get<InfoSistemaVigia>(`${this.hostVigia}${endpoint}`, {headers: { Authorization: `Bearer ${t}`}})
  }

}
