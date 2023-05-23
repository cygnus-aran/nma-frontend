import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../environments/environment";
import {
  EmployeeRegisterRequest,
  EmployeeRegisterResponse, FindAllEmployeesResponse,

  LoginRequest,
  LoginResponse
} from "../model/user";
import {catchError, retry} from "rxjs";
import {ClientRegisterRequest, ClientRegisterResponse, FindAllClientsResponse} from "../model/cliente";
import {FindAllVisitsResponse, VisitRegisterRequest} from "../model/visita";
import {FindAllContractsResponse} from "../model/contrato";
import {FindAllEpisodesResponse} from "../model/episode";
import {CapRegisterRequest, FindAllCapsResponse} from "../model/capacitaciones";



@Injectable({providedIn: 'root'})
export class RestService {
    constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    }

    URL_SERVICE = environment.url + '/v1/';

    public httpHeaders: any = {
        'Content-Type': 'application/json',
    };

    errorHandler(error: HttpErrorResponse): Promise<any> {
        this.snackBar.open('Error: ' + error, 'OK!', {duration: 1500,
            verticalPosition: 'bottom', horizontalPosition: 'center', panelClass: 'noti-roja'})
        return Promise.reject(error.message || error);
    }

    login(request: LoginRequest){
      return this.http.post<LoginResponse>(this.URL_SERVICE + 'credentials/login', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    listEmployees(){
      return this.http.get<FindAllEmployeesResponse>(this.URL_SERVICE + 'persona/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    deleteEmployee(request: EmployeeRegisterRequest){
      return this.http.post<EmployeeRegisterResponse>(this.URL_SERVICE + 'persona/delete-persona', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    registerEmployee(request: EmployeeRegisterRequest){
      return this.http.post<EmployeeRegisterResponse>(this.URL_SERVICE + 'persona/register-persona', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    listClients(){
      return this.http.get<FindAllClientsResponse>(this.URL_SERVICE + 'client/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    deleteClient(request: ClientRegisterRequest){
      return this.http.post<ClientRegisterResponse>(this.URL_SERVICE + 'client/delete-client', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    registerClient(request: ClientRegisterRequest){
      return this.http.post<ClientRegisterResponse>(this.URL_SERVICE + 'client/register-client', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    listVisits(){
      return this.http.get<FindAllVisitsResponse>(this.URL_SERVICE + 'visita/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    listContracts(){
      return this.http.get<FindAllContractsResponse>(this.URL_SERVICE + 'contrato/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    listEpisodes(){
      return this.http.get<FindAllEpisodesResponse>(this.URL_SERVICE + 'formulario/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    listCaps(){
      return this.http.get<FindAllCapsResponse>(this.URL_SERVICE + 'servicio/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    registerCap(request: CapRegisterRequest){
      return this.http.post<FindAllCapsResponse>(this.URL_SERVICE + 'servicio/register-servicio', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    registerVisit(request: VisitRegisterRequest){
      return this.http.post<FindAllCapsResponse>(this.URL_SERVICE + 'visita/register-visita', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

}
