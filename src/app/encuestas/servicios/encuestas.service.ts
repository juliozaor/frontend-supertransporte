import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/Encuesta';
import { HttpClient } from '@angular/common/http';
import { ResumenReporte } from '../modelos/ResumenReporte';
import { environment } from 'src/environments/environment';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { RespuestaEnviar } from '../modelos/RespuestaEnviar';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService extends Autenticable {

  private readonly host = environment.urlBackend 

  constructor(private http: HttpClient) { 
    super()
  }

  obtenerEncuestas(pagina:number, limite: number, idUsuario: string, idEncuesta: number){
    return this.http.get<{ reportadas: ResumenReporte[], paginacion: Paginacion}>(
      `${this.host}/api/v1/encuestas/listar?pagina=${pagina}&limite=${limite}&idVigilado=${idUsuario}&idEncuesta=${idEncuesta}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  obtenerEncuesta(idVigilado: string, idEncuesta: number, idReporte: number){
    return this.http.get<Encuesta>(
      `${this.host}/api/v1/encuestas/visualizar?idVigilado=${idVigilado}&idEncuesta=${idEncuesta}&idReporte=${idReporte}`, 
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    ) 
  }

  guardarRespuesta(idReporte: number, peticion: { respuestas: RespuestaEnviar[] }){
    const enpoint = `/api/v1/respuestas/${idReporte}`
    return this.http.post<{ mensaje: string }>(
      `${this.host}${enpoint}`, 
      peticion, 
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } 
    })
  }
}
