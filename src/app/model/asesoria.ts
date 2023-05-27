
export interface FindAllAsesoriasResponse {
  code: number;
  message: string;
  data: FindAllAsesoriasResponseData;
}

export interface FindAllAsesoriasResponseData {
  operation: string;
  status: string;
  asesorias: Asesoria[];
}

export interface AsesoriaRegisterRequest {
  asesorias: Asesoria[];
}

export interface Asesoria {
  idAsesoria: number;
  fechaAsesoria: Date;
  clienteAsesoria: string;
  idProfesional: string;
  nombreProfesional: string;
}
