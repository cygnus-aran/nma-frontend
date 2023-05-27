import {Component, OnInit, TemplateRef} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {Employee, EmployeeRegisterRequest, Estado, Puesto} from "../../model/user";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Empresa} from "../../model/empresa";
import {Client, ClientRegisterRequest} from "../../model/cliente";
import {Formulario} from "../../model/accidente";
import {FormControl} from "@angular/forms";
import {Asesoria, AsesoriaRegisterRequest} from "../../model/asesoria";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emps: Array<Employee> = new Array<Employee>();
  cls: Array<Client> = new Array<Client>();
  eps: Array<Formulario> = new Array<Formulario>();
  fecase = new FormControl(new Date());


  empObs: Employee = {
    usuarioIdUsuario: 0,
    estadoPersona: "",
    fechaAlta: "",
    fechaBaja: "",
    rolIdRol: "",
    idPersona: "",
    nombrePersona: "",
    puestoPersona: "",
    runPersona: ""
  }
  clObs: Client = {
    rolIdRol: 0,
    rutEmpresa: "",
    emailEmpresa: "",
    estadoEmpresa: "",
    fonoEmpresa: "",
    idEmpresa: 0,
    nombreEmpresa: "",
    responsableEmpresa: "",
    usuarioIdUsuario: 0
  }
  aseObs: Asesoria = {
    clienteAsesoria: "",
    fechaAsesoria: new Date(),
    idAsesoria: 0,
    idProfesional: "",
    nombreProfesional: ""
  }

  idcount: number = 0;
  idcountcl: number = 0;

  private dialogObj: MatDialogRef<any, any> | undefined;
  listEmpresa: Empresa[] = [
    {nombre: "NMA", id: 1},
    {nombre: "Otra", id: 2}
  ];
  listEstado: Estado[] = [
    {nombre: "Activo", id: "A"},
    {nombre: "Inactivo", id: "I"}
  ];
  listPuesto: Puesto[] = [
    {nombre: "CLIENTE", rol: "1"},
    {nombre: "ADMINISTRADOR", rol: "2"},
    {nombre: "PROFESIONAL", rol: "3"}
  ];

  profName: string = '';
  profId: number = 0;

  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listUsers();
    this.listClients();
    this.listEpisodes();
    this.listAsesorias();
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

  deleteUser(emp: Employee){
    let request: EmployeeRegisterRequest = {
      personas: []
    }
    request.personas.push(emp);
    this.api.deleteEmployee(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.listUsers();
        this.listClients();
      }, complete: () => {
        this.listUsers();
        this.listClients();
      }
    });
  }

  listUsers(){
    this.api.listEmployees().subscribe(data => {
      this.dataService.listEmployees = data.data.personas;
      this.emps = data.data.personas;
      this.idcount =  Number(this.emps[this.emps.length - 1].idPersona) + 1;
      for (const emp of this.emps) {
        emp.fechaAlta = emp.fechaAlta.substring(0,10);
        emp.fechaBaja = emp.fechaBaja.substring(0,10);
      }
    });
  }

  listClients(){
    this.api.listClients().subscribe(data => {
      this.dataService.listClients = data.data.clientes;
      this.cls = data.data.clientes;
      this.idcountcl =  Number(this.cls[this.cls.length - 1].idEmpresa) + 1;
      if(this.dataService.usuarioObservado.rol === '2') {
        this.profName = this.cls.find(cliente => cliente.idEmpresa.toString() === this.dataService.usuarioObservado.idEmpresa)!.responsableEmpresa;
        this.profId = this.cls.find(cliente => cliente.idEmpresa.toString() === this.dataService.usuarioObservado.idEmpresa)!.usuarioIdUsuario;
      }
    });
  }

  listEpisodes(){
    this.api.listEpisodes().subscribe(data => {
      this.dataService.listEpisodes = data.data.formularios;
      this.eps = data.data.formularios;
    });
  }

  listAsesorias(){
    this.api.listAsesorias().subscribe(data => {
      this.dataService.listAsesorias = data.data.asesorias;
    });
  }

  openModal(modal: TemplateRef<any>) {
    this.openDialog(modal, '600');
  }

  openDialog(template: TemplateRef<any>, ancho: string) {
    this.dialogObj = this.dialog.open(template, {
      width: ancho + 'px'
    });
  }

  closeDialog() {
    this.empObs = {
      usuarioIdUsuario: 0,
      estadoPersona: "",
      fechaAlta: "",
      fechaBaja: "",
      rolIdRol: "",
      idPersona: "",
      nombrePersona: "",
      puestoPersona: "",
      runPersona: ""
    };
    this.clObs = {
      rolIdRol: 0,
      rutEmpresa: "",
      emailEmpresa: "",
      estadoEmpresa: "",
      fonoEmpresa: "",
      idEmpresa: 0,
      nombreEmpresa: "",
      responsableEmpresa: "",
      usuarioIdUsuario: 0
    }
    this.dialogObj?.close();
  }

  validarFormularioEmpleado(): boolean {
    if (!this.empObs.runPersona || !this.empObs.nombrePersona || !this.empObs.estadoPersona || !this.empObs.puestoPersona) {
      return false;
    }
    return true;
  }

  createUser() {
    let request: EmployeeRegisterRequest = {
      personas: []
    }
    this.empObs.idPersona = this.idcount.toString();
    this.empObs.fechaAlta = Date.now().toString();
    this.empObs.fechaBaja = new Date().setFullYear(new Date().getFullYear() + 1).toString();
    this.empObs.rolIdRol = this.listPuesto.find(rol => rol.nombre == this.empObs.puestoPersona)!.rol;
    request.personas.push(this.empObs);
    this.api.registerEmployee(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, complete: () => {
        this.listUsers();
        this.listClients();
        this.closeDialog();
      }
    });
  }

  createClient() {
    let request: ClientRegisterRequest = {
      clients: []
    }
    this.clObs.estadoEmpresa = 'A';
    this.clObs.idEmpresa = this.dataService.listClients.length + 1;
    this.clObs.rolIdRol = 4;
    this.clObs.usuarioIdUsuario = Number(this.emps.find(emp => emp.nombrePersona == this.clObs.responsableEmpresa)!.rolIdRol);
    request.clients.push(this.clObs);
    this.api.registerClient(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, complete: () => {
        this.listUsers();
        this.listClients();
        this.closeDialog();
      }
    });
  }

  deleteClient(cl: Client) {
    let request: ClientRegisterRequest = {
      clients: []
    }
    request.clients.push(cl);
    this.api.deleteClient(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'});
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'});
        this.listUsers();
        this.listClients();
      }, complete: () => {
        this.listUsers();
        this.listClients();
      }
    });
  }

  validarFormularioCliente(): boolean {
    if (!this.clObs.nombreEmpresa || !this.clObs.fonoEmpresa || !this.clObs.emailEmpresa || !this.clObs.responsableEmpresa) {
      return false;
    }
    return true;
  }

  limpiaRut(n: number) {
    if(n == 1) {
      this.empObs.runPersona = this.empObs.runPersona.replace(/[^0-9kK]/g, '');
      this.empObs.runPersona = this.empObs.runPersona.toUpperCase();
    } else {
      this.clObs.rutEmpresa = this.clObs.rutEmpresa.replace(/[^0-9kK]/g, '');
      this.clObs.rutEmpresa = this.clObs.rutEmpresa.toUpperCase();
    }
  }


  goGestionUsuario(cl: Client) {
    this.router.navigateByUrl('cliente');
    this.dataService.clienteObservado = cl;
  }

  createAsesoria() {
    let request: AsesoriaRegisterRequest = {
      asesorias: []
    }
    this.aseObs.clienteAsesoria = this.dataService.usuarioObservado.idEmpresa;
    this.aseObs.fechaAsesoria = <Date> this.fecase.value;
    this.aseObs.idProfesional = this.profId.toString();
    this.aseObs.nombreProfesional = this.profName;
    request.asesorias.push(this.aseObs);
    this.api.registerAsesoria(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.closeDialog();
        this.aseObs = {
          clienteAsesoria: "", fechaAsesoria: new Date(), idAsesoria: 0, idProfesional: "", nombreProfesional: ""
        }
        this.fecase = new FormControl(new Date());
      }, complete: () => {
        this.listAsesorias();
        this.aseObs = {
          clienteAsesoria: "", fechaAsesoria: new Date(), idAsesoria: 0, idProfesional: "", nombreProfesional: ""
        }
        this.fecase = new FormControl(new Date());
        this.closeDialog();
      }
    });
  }
}
