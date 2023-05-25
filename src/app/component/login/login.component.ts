import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginRequest, User} from "../../model/user";
import {LoginService} from "../../service/login.service";
import {StorageService} from "../../service/storage.service";
import {RestService} from "../../service/rest.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    id: "",
    rol: "",
    username: "",
    idEmpresa: ""
  }
  request: LoginRequest = {
    user: "", password: ""
  }

  disabled = true;
  loading = false;

  constructor(
    private api: RestService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    public snackBar: MatSnackBar,
    public data: DataService) {
    if(this.loginService.getAuth()) {
        this.router.navigate(['listar-integrador']);
    }
  }

  ngOnInit(): void {}

  login() {
    this.request.password = btoa(this.request.password);
    this.api.login(this.request).subscribe({
      next: value => {
        if(value.code !== 202){
          this.snackBar.open(value.message, "OK!", {duration: 2000,
            verticalPosition: 'bottom', horizontalPosition: 'center'})
        } else {
          this.snackBar.open(value.message, "OK!", {duration: 2000,
            verticalPosition: 'bottom', horizontalPosition: 'center'})
          this.storage.setToken("value.access_token!");
          this.user.rol = value.data.rol;
          this.user.username = this.request.user;
          this.user.id = value.data.idUsuario;
          this.user.idEmpresa = value.data.idEmpresa;
        }
      }, error: err => {
        this.snackBar.open("Ha ocurrido un error inesperado", "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.request.password = "";
      }, complete: () => {
        this.request.password = "";
        this.loginService.setAuth(this.user.username);
        this.data.usuarioObservado = this.user;
        this.redirect();
      }
    });
  }

  redirect() {
    this.router.navigate(['home']);
  }




}
