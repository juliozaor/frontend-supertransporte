import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/Encuesta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private http: HttpClient) { }

  obtenerEncuestaTysa(idUsuario: string, idVigilado: string, idEncuesta: number){
    return this.http.get<Encuesta>(`https://tysa.co//alcaldiawilson/super/encuestas/visualizar.php?idUsuario=${idUsuario}&idVigilado=${idVigilado}&idEncuesta=${idEncuesta}`)
  }

  obtenerEncuesta():Encuesta{
    return {
      tipoAccion: 1,
      clasificaciones: [
        {
          clasificacion: 'General',
          preguntas: [
            {
              adjuntable: true,
              adjuntableObligatorio: false,
              documento: '121231_231',
              idPregunta: 1,
              numeroPregunta: 1,
              obligatoria: true,
              pregunta: 'Pregunta 1',
              respuesta: "SI",
              tipoDeEvidencia: 'Tipo evidencia 1',
              tipoPregunta: 'SELECT',
              validaciones: [],
              valoresPregunta: [
                {
                  clave: 'SI',
                  valor: 'SI'
                },
                {
                  clave: 'NO',
                  valor: 'NO'
                }
              ]
            },
            {
              adjuntable: true,
              adjuntableObligatorio: false,
              documento: '121231_232',
              idPregunta: 2,
              numeroPregunta: 2,
              obligatoria: true,
              pregunta: 'Pregunta 2',
              respuesta: "NO",
              tipoDeEvidencia: 'Tipo evidencia 1',
              tipoPregunta: 'SELECT',
              validaciones: [],
              valoresPregunta: [
                {
                  clave: 'SI',
                  valor: 'SI'
                },
                {
                  clave: 'NO',
                  valor: 'NO'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
