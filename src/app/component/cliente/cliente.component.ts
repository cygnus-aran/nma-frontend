import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {MatDialog} from "@angular/material/dialog";
import {Visit} from "../../model/visita";
import {Contract} from "../../model/contrato";
import {Episode} from "../../model/episode";
import {Cap} from "../../model/capacitaciones";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  vsts: Array<Visit> = new Array<Visit>();
  cnts: Array<Contract> = new Array<Contract>();
  eps: Array<Episode> = new Array<Episode>();
  caps: Array<Cap> = new Array<Cap>();
  idCliente: number = 0;

  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listAll();
    this.idCliente = this.dataService.clienteObservado.idEmpresa;
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

  private listAll() {
    this.api.listVisits().subscribe(data => {
      this.dataService.listVisits = data.data.visits;
      this.vsts = data.data.visits;
    });

    this.api.listContracts().subscribe(data => {
      this.dataService.listContracts = data.data.contracts;
    });

    this.api.listEpisodes().subscribe(data => {
      this.dataService.listEpisodes = data.data.formularios;
      this.eps = data.data.formularios;
    });

    this.api.listCaps().subscribe(data => {
      this.dataService.listCaps = data.data.servicios;
      this.caps = data.data.servicios;
    });
  }

  goHome() {
    this.router.navigateByUrl('home');
  }
}

