
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

export interface Contract {
  idContrato: number;
  fechaContrato: Date;
  estadoContrato: string;
  idClienteContrato: string;
}
