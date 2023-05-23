export interface Respuesta{
    preguntaId: number,
    valor:string, //"N"
    documento?: File,
    ruta?: string,
    nombreArchivo?: string,
}