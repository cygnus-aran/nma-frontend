export interface User {
  username:  string;
  rol: string;
}

export interface LoginRequest {
  user: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  message: string;
  rol: string;
}

export interface FindAllResponse {
  code: number;
  message: string;
  data: FindAllResponseData;
}

export interface FindAllResponseData {
  operation: string;
  status: string;
  personas: Employee[];
}

export interface Employee {
 idUsuario: string;
 rutPersona: number;
 nombrePersona: string;
 idEmpresa: string;
 fechaAlta: string;
 fechaBaja: string;
 fechaNacimiento: string;
 estadoPersona: string;
 puestoPersona: string;
 idRol: number;
 password: string;
}




