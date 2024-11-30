export type Opcion = {
  id: number;
  ruta: string;
  texto: string;
  icono: string;
};

export interface AuthResponse {
  isValid: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      name: string;
    };
  };
}


export interface HectareaResponse {
  isValid: boolean;
  data:    DataHectarea;
  message: string;
}

export interface DataHectarea {
  idHectarea: number;
  comunidad:  string;
  ubicacion:  string;
  status:     string;
  plantas:    Planta[];
}

export interface Planta {
  idPlanta: number;
  status:   Status;
  aptaSensorCrecimiento: boolean;
  aptaSensorProducto: boolean;
}

export enum Status {
  Saludable = "SALUDABLE",
}

export interface CajaResponse {
  isValid: boolean;
  data:    Data;
  message: string;
}

export interface Data {
  kg:     number;
  planta: Planta;
  fecha:  Date;
  tipo:   string;
  idCaja: number;
}

