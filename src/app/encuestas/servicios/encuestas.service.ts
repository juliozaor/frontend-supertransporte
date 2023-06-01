import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/Encuesta';
import { HttpClient } from '@angular/common/http';
import { ResumenReporte } from '../modelos/ResumenReporte';
import { environment } from 'src/environments/environment';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';

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
      `${this.host}/api/v1/encuestas/listar?pagina=${pagina}&limite=${limite}&idUsuario=${idUsuario}&idEncuesta=${idEncuesta}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  obtenerEncuesta(idUsuario: string, idVigilado: string, idEncuesta: number){
    return this.http.get<Encuesta>(
      `${this.host}/api/v1/encuestas/visualizar?idUsuario=${idUsuario}&idVigilado=${idVigilado}&idEncuesta=${idEncuesta}`, 
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    ) 
  }
}
