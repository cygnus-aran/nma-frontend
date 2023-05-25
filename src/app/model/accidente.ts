export interface Sexo {
  sexo: string;
}

export interface Region {
  nombre: string;
  id: number;
}

export interface Formulario {
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
  telefonoElaboradorInforme: string;
  nombreRevisador: string;
  cargoRevisador: string;
  fechaRevision: Date;
  idCliente: string;
  rutTrabajador: string;
}

export interface FormularioRegisterRequest {
  formularios: Formulario[];
}


