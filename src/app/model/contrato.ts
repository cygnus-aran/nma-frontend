
export interface FindAllContractsResponse {
  code: number;
  message: string;
  data: FindAllContractsResponseData;
}

export interface FindAllContractsResponseData {
  operation: string;
  status: string;
  contracts: Contract[];
}

export interface ContratoRegisterRequest {
  contracts: Contract[];
}

export interface Contract {
  idContrato: number;
  fechaContrato: Date | undefined;
  estadoContrato: string;
  idClienteContrato: string;
  cantidadVisita: string;
  cantidadServicio: string;
  totalContrato: string;
  fechaVencimiento: Date | undefined;
}
