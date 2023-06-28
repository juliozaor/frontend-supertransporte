import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { ArchivoTemporal } from '../modelos/ArchivoTemporal';

@Injectable({
  providedIn: 'root'
})
export class ArchivosEncuestasService extends Autenticable {

  private readonly host = environment.urlBackendArchivos;

  constructor(private http: HttpClient) { 
    super()
  }

  guardarArchivoTemporal(archivo: File, idPregunta: number, idVigilado: string){
    const endpoint = '/api/v1/archivos'
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('idPregunta', idPregunta.toString())
    formData.append('idVigilado', idVigilado.toString())
    formData.append('rutaRaiz', 'pesv')
    formData.append('temporal', 'true')
    return this.http.post<ArchivoTemporal>(
        `${this.host}${endpoint}`, 
        formData, 
        { headers: { Authorization: `Bearer d4a32a3b-def6-4cc2-8f77-904a67360b53` } }
    )
  }
}
