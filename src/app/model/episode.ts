

export interface FindAllEpisodesResponse {
  code: number;
  message: string;
  data: FindAllEpisodesResponseData;
}

export interface FindAllEpisodesResponseData {
  operation: string;
  status: string;
  formularios: Episode[];
}

export interface Episode {
  folio: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombresTrabajador: string;
  profesion?: string;
  cargo?: string;
  edad: number;
  sexo: string;
  annoAntiguedad?: number;
  fechaEpisodio: Date;
  horaEpisodio: Date;
  region?: string;
  ubicacionOFaena: string;
  area: string;
  ubicacionExacta: string;
  nombreJefatura: string;
  actividadRealizada: string;
  lugarEspecificoEpisodio: string;
  tipoEpisodio: string;
  accionInsegura: string;
  condicionInsegura: string;
  causas: string;
  testigos?: string;
  cargoTestigo?: string;
  elaboradorInforme: string;
  cargoElaboradorInforme: string;
  fechaInforme: Date;
  nombreRevisador: string;
  cargoRevisador: string;
  fechaRevision: Date;
  anexos?: ArrayBuffer | null;
  episodioIdEpisodio: string;
}
