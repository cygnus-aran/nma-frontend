
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

export interface Visit {
  idVisita: number;
  fechaVisita: Date;
  descripcionVisita: string;
  nombreProfesional: string;
  estado: string;
  personaRunPersona: string;
  idEmpresa: string;
}
