
export interface FindAllCapsResponse {
  code: number;
  message: string;
  data: FindAllCapsResponseData;
}

export interface FindAllCapsResponseData {
  operation: string;
  status: string;
  servicios: Cap[];
}

export interface CapRegisterRequest {
  servicios: Cap[];
}

export interface Cap {
  idServicio: number;
  nombreServicio: string;
  valorServicio: number;
  descripcionServicio?: string;
  fechaCreacionServicio?: Date;
  fechaBajaServicio?: Date;
  idPersona: string;
  idCliente: string;
  estadoServicio: string;
}

export interface Asistente {
  nombre: string;
}
