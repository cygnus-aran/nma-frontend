import {Formulario} from "./accidente";


export interface FindAllEpisodesResponse {
  code: number;
  message: string;
  data: FindAllEpisodesResponseData;
}

export interface FindAllEpisodesResponseData {
  operation: string;
  status: string;
  formularios: Formulario[];
}


