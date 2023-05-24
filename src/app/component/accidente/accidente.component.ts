import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {MatDialog} from "@angular/material/dialog";
import {Region, Sexo} from "../../model/accidente";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-accidente',
  templateUrl: './accidente.component.html',
  styleUrls: ['./accidente.component.css']
})
export class AccidenteComponent implements OnInit{

  listSexo: Sexo[] = [
    {sexo: "Femenino"},
    {sexo: "Masculino"},
    {sexo: "Otro"},
    {sexo: "Prefiere no especificar"}
  ];
  listRegion: Region[] = [
    { nombre: "Arica y Parinacota", id: 15 },
    { nombre: "Tarapacá", id: 1 },
    { nombre: "Antofagasta", id: 2 },
    { nombre: "Atacama", id: 3 },
    { nombre: "Coquimbo", id: 4 },
    { nombre: "Valparaíso", id: 5 },
    { nombre: "Metropolitana de Santiago", id: 13 },
    { nombre: "Libertador General Bernardo O'Higgins", id: 6 },
    { nombre: "Maule", id: 7 },
    { nombre: "Ñuble", id: 16 },
    { nombre: "Biobío", id: 8 },
    { nombre: "La Araucanía", id: 9 },
    { nombre: "Los Ríos", id: 14 },
    { nombre: "Los Lagos", id: 10 },
    { nombre: "Aysén del General Carlos Ibáñez del Campo", id: 11 },
    { nombre: "Magallanes y de la Antártica Chilena", id: 12 }
  ];

  fecacc = new FormControl(new Date());
  horacc = new Date();
  desc: string = "\n" + "Señale a lo menos la actividad que se encontraba realizando el trabajador, el mecanismo del accidente, tipo de lesión, etc.";

  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

  updateDesc($event: Event) {
    const value = (event!.target as any).value;
    this.desc = value;
  }

  goHome() {
    this.router.navigateByUrl('home');
  }

  crearAccidente() {

  }
}


