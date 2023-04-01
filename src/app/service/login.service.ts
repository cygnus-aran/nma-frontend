import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, catchError, retry, throwError} from 'rxjs';
import {LoginRequest, LoginResponse, User} from '../model/user';
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_LOGIN = environment.url + '/api/v1/login/oauth/token';
  private httpHeaders: any = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + window.btoa('frontendapp:hjMBlyZfwfv1')
  };

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    public zone: NgZone
  ) {
  }

  ngOnInit(): void {
  }

  getAuth() {
    return sessionStorage.getItem('currentUser');
  }

  setAuth(setAuth: string): void {
    sessionStorage.setItem('currentUser', setAuth);
  }

  errorHandler(error: HttpErrorResponse) {
    return Promise.reject(error.message || error);
  }

  loader = new BehaviorSubject<Boolean>(false);

  login(request: HttpParams) {
    return this.http.post<LoginResponse>(this.URL_LOGIN, request, { headers: this.httpHeaders }).pipe
    (retry(0), catchError(this.errorHandler));
  }

  clearStorage(){
    sessionStorage.clear();
  }

}
