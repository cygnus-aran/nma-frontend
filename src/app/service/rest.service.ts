import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../environments/environment";
import {FindAllResponse, LoginRequest, LoginResponse} from "../model/user";
import {catchError, retry} from "rxjs";



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
      return this.http.get<FindAllResponse>(this.URL_SERVICE + 'employee/find-all',
        {headers: this.httpHeaders, responseType: 'json'}).pipe(retry(1), catchError(this.errorHandler));
    }



}
