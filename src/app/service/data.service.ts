import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee, User} from "../model/user";
import {Client} from "../model/cliente";
import {Visit} from "../model/visita";
import {Contract} from "../model/contrato";
import {Cap} from "../model/capacitaciones";
import {Formulario} from "../model/accidente";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class DataService {


  rutValido: boolean = false;
  listEmployees: Array<Employee> = new Array<Employee>();
  listClients: Array<Client> = new Array<Client>();
  listVisits: Array<Visit> = new Array<Visit>();
  listContracts: Array<Contract> = new Array<Contract>();
  listEpisodes: Array<Formulario> = new Array<Formulario>();
  listCaps: Array<Cap> = new Array<Cap>();

  clienteObservado: Client = {
    emailEmpresa: "",
    estadoEmpresa: "",
    fonoEmpresa: "",
    idEmpresa: 0,
    nombreEmpresa: "",
    responsableEmpresa: "",
    rolIdRol: 0,
    rutEmpresa: "",
    usuarioIdUsuario: 0
  }


  constructor(private http: HttpClient) {
  }

  validaRut(rut: string) {
    if(rut.length >= 8 && rut.length <= 10) {
      let dv: number | string = rut.slice(-1).toUpperCase();
      let cuerpo = rut.slice(0, -1);
      let suma = 0;
      let multiplicador = 2;
      for(let i=1;i<=cuerpo.length;i++) {
        suma += parseInt(cuerpo.charAt(cuerpo.length - i)) * multiplicador;
        if(multiplicador == 7) {multiplicador = 2;}
        else {multiplicador++;}
      }
      let dvEsperado = 11 - (suma % 11);
      dv = (dv == 'K')?10 : dv;
      dv = (dv == '0')?11 : dv;
      if (dvEsperado == dv) { this.rutValido = true; }
      else { this.rutValido = false; }
    } else { this.rutValido = false; }
  }

  usuarioObservado: User = {
    id: "",
    rol: "",
    username: "",
    idEmpresa: ""
  }

  getEmployees() {
    return this.listEmployees;
  }

  getClients() {
    return this.listClients;
  }

}
