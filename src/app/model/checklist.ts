
export interface FindAllChecklistsResponse {
  code: number;
  message: string;
  data: FindAllChecklistsResponseData;
}

export interface FindAllChecklistsResponseData {
  operation: string;
  status: string;
  checklists: Checklist[];
}

export interface ChecklistRegisterRequest {
  checklists: Checklist[];
}

export interface Checklist {
  id: number;
  estadoChecklist: string;
  comentario: string;
  idCliente: string;
  idProfesional: string;
  nombreChecklist: string;
  fechaCreacion: Date;
  fechaRevision: Date;
  fechaCierre: Date;
  idVisita: string;
}
