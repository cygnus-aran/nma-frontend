import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {DataService} from "../../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../../service/rest.service";
import {Employee} from "../../../model/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emps: Array<Employee> = new Array<Employee>();

  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService) { }

  ngOnInit(): void {
    this.api.listEmployees().subscribe(data => {
      this.dataService.listEmployees = data.data.personas;
      this.emps = data.data.personas;
      for (const emp of this.emps) {
        emp.fechaAlta = emp.fechaAlta.substring(0,10);
        emp.fechaBaja = emp.fechaBaja.substring(0,10);
        emp.fechaNacimiento = emp.fechaNacimiento.substring(0,10);
      }
    });
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

}
