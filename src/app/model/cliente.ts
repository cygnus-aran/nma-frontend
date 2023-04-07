export interface FindAllClientsResponse {
  code: number;
  message: string;
  data: FindAllClientsResponseData;
}

export interface FindAllClientsResponseData {
  operation: string;
  status: string;
  personas: Client[];
}

export interface Client {
  idEmpresa: number;
  nombreEmpresa: string;
  direccionEmpresa: string;
  fonoEmpresa: string;
  emailEmpresa: string;
  responsableEmpresa: string;
  estadoEmpresa: string;
  usuariosIdUsuario: number;
}

export interface ClientRegisterRequest {
  clients: Client[];
}

export interface ClientRegisterResponse {
  operation: string;
  status: string;
  clientes: Client[];
}
