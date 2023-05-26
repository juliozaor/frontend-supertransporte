import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoportesService extends Autenticable{
  private readonly host = environment.urlBackend

  constructor(private http: HttpClient) { 
    super()
  }

  crearSoporte(descripcion: string, adjuntable?: File){
    const endpoint = `/api/v1/soportes`
    const formData = new FormData()
    formData.append('descripcion', descripcion)
    adjuntable ? formData.append('adjunto', adjuntable) : undefined
    return this.http.post(`${this.host}${endpoint}`, formData, { headers: this.obtenerCabeceraAutorizacion() })
  }
}
