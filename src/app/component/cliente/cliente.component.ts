import {Component, OnInit, TemplateRef} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Visit, VisitRegisterRequest} from "../../model/visita";
import {Contract} from "../../model/contrato";
import {Asistente, Cap, CapRegisterRequest} from "../../model/capacitaciones";
import {FormControl} from "@angular/forms";
import {Formulario} from "../../model/accidente";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  vsts: Array<Visit> = new Array<Visit>();
  cnts: Array<Contract> = new Array<Contract>();
  eps: Array<Formulario> = new Array<Formulario>();
  caps: Array<Cap> = new Array<Cap>();
  idCliente: number = 0;
  cap: Cap = {
    descripcionServicio: "",
    estadoServicio: "",
    fechaBajaServicio: undefined,
    fechaCreacionServicio: undefined,
    idCliente: "",
    idPersona: "",
    idServicio: 0,
    nombreServicio: "",
    valorServicio: 0
  }

  vst: Visit = {
    descripcionVisita: "",
    estado: "",
    fechaVisita: undefined,
    idEmpresa: "",
    idVisita: 0,
    nombreProfesional: "",
    personaRunPersona: "",
    valor: ""
  }

  private dialogObj: MatDialogRef<any, any> | undefined;
  asistentes: Asistente[] = [];
  materiales: string = "Agregar Materiales Necesarios para la Capacitación Aquí";
  desc: string = "Detalles Visita";
  feccap = new FormControl(new Date());
  fecvis = new FormControl(new Date());


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

  openModal(modal: TemplateRef<any>) {
    this.openDialog(modal, '600');
  }

  openDialog(template: TemplateRef<any>, ancho: string) {
    this.dialogObj = this.dialog.open(template, {
      width: ancho + 'px', disableClose: true
    });
  }

  closeDialog() {
    this.cap = {
      fechaBajaServicio: undefined,
      fechaCreacionServicio: undefined,
      estadoServicio: "",
      descripcionServicio: "",
      idCliente: "",
      idPersona: "",
      idServicio: 0,
      nombreServicio: "",
      valorServicio: 0
    }
    this.vst = {
      descripcionVisita: "",
      estado: "",
      fechaVisita: undefined,
      idEmpresa: "",
      idVisita: 0,
      nombreProfesional: "",
      personaRunPersona: "",
      valor: ""
    }
    this.asistentes = [];
    this.dialogObj?.close();
  }

  createCap() {
    let request: CapRegisterRequest = {
      servicios: []
    }
    this.cap.estadoServicio = 'A';
    this.cap.idCliente = String(this.dataService.clienteObservado.idEmpresa);
    this.cap.fechaCreacionServicio = <Date> this.feccap.value;
    this.cap.idPersona = String(this.dataService.clienteObservado.usuarioIdUsuario);
    let fechaBaja = new Date(<Date> this.feccap.value);
    fechaBaja?.setMonth(fechaBaja?.getMonth() + 1);
    this.cap.fechaBajaServicio = <Date>fechaBaja;
    this.cap.nombreServicio = "Capacitacion " + (this.dataService.listCaps.length + 1);
    let desc = "";
    for (const descElement of this.asistentes) {
      desc = desc + "\n Asistente: " + descElement.nombre;
    }
    desc = desc + "\n Materiales: \n" + this.materiales;
    this.cap.descripcionServicio = desc;
    request.servicios.push(this.cap);
    this.api.registerCap(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.closeDialog();
      }, complete: () => {
        this.listAll();
        this.closeDialog();
      }
    });
  }

  agregarAsistente() {
    let as: Asistente = {
      nombre: ""
    }
    this.asistentes.push(as);
  }

  createVisit() {
    let request: VisitRegisterRequest = {
      visits: []
    }
    this.vst.estado = 'A';
    this.vst.idEmpresa = String(this.dataService.clienteObservado.idEmpresa);
    this.vst.nombreProfesional = this.dataService.clienteObservado.responsableEmpresa;
    this.vst.descripcionVisita = this.desc;
    this.vst.fechaVisita = <Date> this.fecvis.value
    this.vst.personaRunPersona = "";
    request.visits.push(this.vst);
    this.api.registerVisit(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.closeDialog();
      }, complete: () => {
        this.listAll();
        this.closeDialog();
      }
    });
  }

  updateMats($event: Event) {
    const value = (event!.target as any).value;
    this.materiales = value;
  }

  updateDesc($event: Event) {
    const value = (event!.target as any).value;
    this.desc = value;
  }
}

