import { HttpClient } from '@angular/common/http';
import { Injectable, enableProdMode } from '@angular/core';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { environment } from 'src/environments/environment';
import { ResumenReporteAsignados } from '../modelos/ResumenReporteAsignado';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { Encuesta } from 'src/app/encuestas/modelos/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class ServicioVerificaciones extends Autenticable{

  private readonly host = environment.urlBackend 

  constructor(private clienteHttp: HttpClient) { super() }

  obtenerReportes(pagina: number, limite: number, filtros: any){
    const endpoint = `/api/v1/reportes/asignados?pagina=${pagina}&limite=${limite}`
    return this.clienteHttp.get<{asignadas: ResumenReporteAsignados[], paginacion: Paginacion}>(`${this.host}${endpoint}`, { headers: this.obtenerCabeceraAutorizacion() })
  }

  obtenerReporte(idEncuesta: number, idReporte: number, idVigilado: string){
    const endpoint = `/api/v1/reportes/visualizar?idEncuesta=${idEncuesta}&idReporte=${idReporte}&idVigilado=${idVigilado}`
    return this.clienteHttp.get<Encuesta>(`${this.host}${endpoint}`, { headers: this.obtenerCabeceraAutorizacion() })
  }

}
