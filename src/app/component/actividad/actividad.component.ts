import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {MatDialog} from "@angular/material/dialog";
import {Checklist} from "../../model/checklist";
import {Estado} from "../../model/user";

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  chks: Array<Checklist> = new Array<Checklist>();

  listEstados: Estado[] = [
    {nombre: "Pendiente", id: "A"},
    {nombre: "Cumplido", id: "C"},
    {nombre: "Incumplido", id: "I"},
    {nombre: "Parcial", id: "P"},
  ]

  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.chks = this.dataService.checkListObservado;
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

  goHome() {
    this.router.navigateByUrl('home');
  }

}
