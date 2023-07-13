export interface Formulario {
    nombre:       string;
    subIndicador: SubIndicador[];
}

export interface SubIndicador {
    nombreSubIndicador: string;
    codigo:             number;
    preguntas:          Pregunta[];
}

export interface Pregunta {
    idPregunta:             number;
    pregunta:               string;
    obligatoria:            boolean;
    respuesta:              string;
    tipoDeEvidencia:        string;
    documento:              string;
    nombreOriginal:         string;
    ruta:                   string;
    adjuntable:             boolean;
    adjuntableObligatorio:  boolean;
    tipoPregunta:           string;
    valoresPregunta:        any[];
    validaciones:           any[] | null;
    observacion:            string;
    cumple:                 string;
    observacionCumple:      string;
    corresponde:            string;
    observacionCorresponde: string;
}
