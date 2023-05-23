
export interface FindAllVisitsResponse {
  code: number;
  message: string;
  data: FindAllVisitsResponseData;
}

export interface FindAllVisitsResponseData {
  operation: string;
  status: string;
  visits: Visit[];
}

export interface VisitRegisterRequest {
  visits: Visit[];
}

export interface Visit {
  idVisita: number;
  fechaVisita: Date | undefined;
  descripcionVisita: string;
  nombreProfesional: string;
  estado: string;
  personaRunPersona: string;
  idEmpresa: string;
  valor: string;
}
