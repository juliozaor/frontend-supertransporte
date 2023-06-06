export interface Categorizacion {
    modalidadRadio: ModalidadRadio;
    tipoCategoria:  TipoCategoria[];
}

export interface ModalidadRadio {
    cabeceras: string[];
    filas:     ModalidadRadioFila[];
}

export interface ModalidadRadioFila {
    id:        number;
    modalidad: string;
    radio:     string;
}

export interface TipoCategoria {
    idTipo:                 number;
    nombre:                 string;
    orden:                  number;
    categoriaClasificacion: CategoriaClasificacion[];
}

export interface CategoriaClasificacion {
    id:        number;
    nombre:    string;
    orden:     number;
    cabeceras: string[];
    filas:     CategoriaClasificacionFila[];
}

export interface CategoriaClasificacionFila {
    nombre: string;
    datos:  Dato[];
}

export interface Dato {
    idFila:    number;
    idColumna: number;
    valor:     null | string;
    estado?: boolean;
}