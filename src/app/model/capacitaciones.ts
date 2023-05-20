
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

export interface Cap {
  idServicio: number;
  nombreServicio: string;
  valorServicio: number;
  descripcionServicio?: string;
  fechaCreacionServicio: string;
  fechaBajaServicio?: string;
  episodioIdEpisodio: string;
  visitaIdVisita: string;
}
