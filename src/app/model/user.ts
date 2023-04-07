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
 idUsuario: string;
 rutPersona: number | undefined;
 nombrePersona: string;
 idEmpresa: string;
 fechaAlta: string;
 fechaBaja: string;
 fechaNacimiento: string;
 estadoPersona: string;
 puestoPersona: string | undefined;
 idRol: number;
 password: string;
}

export interface EmployeeRegisterRequest {
  employees: Employee[];
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



