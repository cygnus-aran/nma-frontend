export interface User {
  username:  string;
  rol: string;
  id: string;
  idEmpresa: string;
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
  idUsuario: string;
}

export interface FindAllEmployeesResponse {
  code: number;
  message: string;
  data: FindAllEmployeesResponseData;
}

export interface FindAllEmployeesResponseData {
  operation: string;
  status: string;
  personas: Employee[];
}

export interface Employee {
 idPersona: string;
 runPersona: string;
 nombrePersona: string;
 fechaAlta: string;
 fechaBaja: string;
 estadoPersona: string;
 puestoPersona: string;
 usuarioIdUsuario: number;
 rolIdRol: string;
}

export interface EmployeeRegisterRequest {
  personas: Employee[];
}

export interface EmployeeRegisterResponse {
  operation: string;
  status: string;
  personas: Employee[];
}

export interface Estado {
  nombre: string;
  id: string;
}

export interface Puesto {
  nombre: string;
  rol: string;
}



