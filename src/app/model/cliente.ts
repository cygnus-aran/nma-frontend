export interface FindAllClientsResponse {
  code: number;
  message: string;
  data: FindAllClientsResponseData;
}

export interface FindAllClientsResponseData {
  operation: string;
  status: string;
  cliente: Client[];
}

export interface Client {
  idEmpresa: number;
  nombreEmpresa: string;
  rutEmpresa: string;
  fonoEmpresa: string;
  emailEmpresa: string;
  responsableEmpresa: string;
  estadoEmpresa: string;
  usuarioIdUsuario: number;
  rolIdRol: number;
  cantidadEmpleados: string;
  accidentabilidad?: number;
  cantidadAccidentes?: number;
}

export interface ClientRegisterRequest {
  clients: Client[];
}

export interface ClientRegisterResponse {
  operation: string;
  status: string;
  clientes: Client[];
}
