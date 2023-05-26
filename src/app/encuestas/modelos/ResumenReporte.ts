export interface ResumenReporte {
    idEncuestaDiligenciada: number;
    idVigilado:             string;
    numeroReporte:          number;
    encuesta:               string;
    descripcion:            string;
    fechaInicio:            string;
    fechaFinal:             string;
    fechaEnvioST?:           string;
    razonSocial:            string;
    nit:                    string;
    email:                  string;
    estado:                 string;
}
