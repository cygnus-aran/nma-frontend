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
      return this.http.get<FindAllEmployeesResponse>(this.URL_SERVICE + 'employee/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    deleteEmployee(request: EmployeeRegisterRequest){
      return this.http.post<EmployeeRegisterResponse>(this.URL_SERVICE + 'employee/delete-employee', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }

    registerEmployee(request: EmployeeRegisterRequest){
      return this.http.post<EmployeeRegisterResponse>(this.URL_SERVICE + 'employee/register-employee', request,
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
      return this.http.post<ClientRegisterResponse>(this.URL_SERVICE + 'employee/register-client', request,
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }



}
