import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {MatDialog} from "@angular/material/dialog";
import {Formulario, FormularioRegisterRequest, Region, Sexo} from "../../model/accidente";
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
  isFormValid = false;
  fecacc = new FormControl(new Date());
  horacc = new Date();
  desc: string = "\n" + "Señale a lo menos la actividad que se encontraba realizando el trabajador, el mecanismo del accidente, tipo de lesión, etc.";
  acc: Formulario = {
    accionInsegura: "",
    actividadRealizada: "",
    annoAntiguedad: 0,
    apellidoMaterno: "",
    apellidoPaterno: "",
    area: "",
    cargo: "",
    cargoElaboradorInforme: "",
    cargoRevisador: "",
    cargoTestigo: "",
    causas: "",
    condicionInsegura: "",
    edad: 0,
    elaboradorInforme: "",
    fechaEpisodio: new Date(),
    fechaRevision: new Date(),
    folio: 0,
    horaEpisodio: new Date(),
    idCliente: "",
    lugarEspecificoEpisodio: "",
    nombreJefatura: "",
    nombreRevisador: "",
    nombresTrabajador: "",
    profesion: "",
    region: "",
    rutTrabajador: "",
    sexo: "",
    telefonoElaboradorInforme: "",
    testigos: "",
    tipoEpisodio: "",
    ubicacionExacta: "",
    ubicacionOFaena: ""
  }


  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateFormValidity();
    console.log(this.dataService.clienteObservado);
  }

  updateFormValidity() {
    const formFields = [
      this.acc.apellidoPaterno,
      this.acc.apellidoMaterno,
      this.acc.nombresTrabajador,
      this.acc.edad,
      this.acc.sexo,
      this.acc.ubicacionOFaena,
      this.acc.area,
      this.acc.ubicacionExacta,
      this.acc.nombreJefatura,
      this.acc.elaboradorInforme,
      this.acc.cargoElaboradorInforme,
      this.acc.telefonoElaboradorInforme,
      this.acc.rutTrabajador,
      this.acc.region
    ];
    this.isFormValid = (formFields.every(field => !!field) && this.dataService.rutValido) ;
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

  limpiaRut() {
    this.acc.rutTrabajador = this.acc.rutTrabajador?.replace(/[^0-9kK]/g, '');
    this.acc.rutTrabajador = this.acc.rutTrabajador?.toUpperCase();
    this.dataService.validaRut(this.acc.rutTrabajador);
  }

  crearAccidente() {
    let request: FormularioRegisterRequest = {
      formularios: []
    }
    this.acc.fechaEpisodio = this.fecacc.value!;
    this.acc.horaEpisodio = this.horacc;
    this.acc.actividadRealizada = this.desc;
    this.acc.idCliente = this.dataService.usuarioObservado.idEmpresa;
    this.acc.tipoEpisodio = "Accidente"
    this.acc.fechaRevision = new Date(this.acc.fechaEpisodio);
    this.acc.fechaRevision.setMonth(this.acc.fechaRevision.getMonth() + 1);
    request.formularios.push(this.acc);
    this.api.registerForm(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, complete: () => {
        this.goHome();
      }
    });
  }
}


