import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/Encuesta';
import { HttpClient } from '@angular/common/http';
import { ResumenReporte } from '../modelos/ResumenReporte';
import { environment } from 'src/environments/environment';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { RespuestaEnviar } from '../modelos/RespuestaEnviar';
import { Motivo } from '../modelos/Motivo';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService extends Autenticable {

  private readonly host = environment.urlBackend
  private motivos: Motivo[] = []

  constructor(private http: HttpClient) {
    console.log('construyendo servicio encuesta')
    super()
    this.establecerMotivos()
    console.log(this.motivos)
  }

  obtenerEncuestas(pagina: number, limite: number, idUsuario: string, idEncuesta: number) {
    return this.http.get<{ reportadas: ResumenReporte[], paginacion: Paginacion }>(
      `${this.host}/api/v1/encuestas/listar?pagina=${pagina}&limite=${limite}&idVigilado=${idUsuario}&idEncuesta=${idEncuesta}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  obtenerEncuesta(idVigilado: string, idEncuesta: number, idReporte: number) {
    return this.http.get<Encuesta>(
      `${this.host}/api/v1/encuestas/visualizar?idVigilado=${idVigilado}&idEncuesta=${idEncuesta}&idReporte=${idReporte}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  guardarRespuesta(idReporte: number, peticion: { respuestas: RespuestaEnviar[] }) {
    const enpoint = `/api/v1/respuestas/${idReporte}`
    return this.http.post<{ mensaje: string }>(
      `${this.host}${enpoint}`,
      peticion,
      {
        headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` }
      })
  }

  enviarRespuesta(idEncuesta: number, idReporte: number, idVigilado: string) {
    const enpoint = `/api/v1/encuestas/enviar`
    return this.http.post<{ mensaje: string }>(
      `${this.host}${enpoint}`,
      { idEncuesta, idReporte, idVigilado },
      {
        headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` }
      })
  }

  establecerMotivos(): void {
    this.motivos = [
      {
        descripcion: 'Motivo 1',
        id: 1
      },
      {
        descripcion: 'Motivo 2',
        id: 2
      },
      {
        descripcion: 'Motivo 3',
        id: 3
      }
    ]
  }

  obtenerMotivos(): Motivo[] {
    return this.motivos
  }
}
