import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/Encuesta';
import { HttpClient } from '@angular/common/http';
import { ResumenReporte } from '../modelos/ResumenReporte';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private http: HttpClient) { }

  obtenerEncuestasTysa(idUsuario: string){
    return this.http.get<ResumenReporte[]>(`https://tysa.co//alcaldiawilson/super/encuestas/listar.php?idUsuario=${idUsuario}`)
  }

  obtenerEncuestaTysa(idUsuario: string, idVigilado: string, idEncuesta: number){
    return this.http.get<Encuesta>(`https://tysa.co//alcaldiawilson/super/encuestas/visualizar.php?idUsuario=${idUsuario}&idVigilado=${idVigilado}&idEncuesta=${idEncuesta}`)
  }
}
