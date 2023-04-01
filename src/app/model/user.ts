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
