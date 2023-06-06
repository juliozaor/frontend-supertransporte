import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { ArchivoTemporal } from '../modelos/ArchivoTemporal';

@Injectable({
  providedIn: 'root'
})
export class ArchivosEncuestasService extends Autenticable {

  private readonly host = environment.urlBackend 

  constructor(private http: HttpClient) { 
    super()
  }

  guardarArchivoTemporal(archivo: File, idPregunta: number, idVigilado: string){
    const endpoint = '/api/v1/archivos/temporales'
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('idPregunta', idPregunta.toString())
    formData.append('idVigilado', idVigilado.toString())
    return this.http.post<ArchivoTemporal>(
        `${this.host}${endpoint}`, 
        formData, 
        { headers: this.obtenerCabeceraAutorizacion() }
    )
  }
}
