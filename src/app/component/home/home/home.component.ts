import {Component, OnInit, TemplateRef} from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {DataService} from "../../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../../service/rest.service";
import {Employee, EmployeeRegisterRequest, Estado, Puesto} from "../../../model/user";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Empresa} from "../../../model/empresa";
import {Client, ClientRegisterRequest} from "../../../model/cliente";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emps: Array<Employee> = new Array<Employee>();
  cls: Array<Client> = new Array<Client>();

  empObs: Employee = {
    estadoPersona: "",
    fechaAlta: "",
    fechaBaja: "",
    fechaNacimiento: "",
    idEmpresa: "",
    idRol: 0,
    idUsuario: "",
    nombrePersona: "",
    password: "",
    puestoPersona: "",
    rutPersona: undefined
  }
  clObs: Client = {
    direccionEmpresa: "",
    emailEmpresa: "",
    estadoEmpresa: "",
    fonoEmpresa: "",
    idEmpresa: 0,
    nombreEmpresa: "",
    responsableEmpresa: "",
    usuariosIdUsuario: 0
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
    {nombre: "ADMINISTRADOR", rol: "1"},
    {nombre: "VENDEDOR", rol: "2"},
    {nombre: "OTRO", rol: "3"}
  ];


  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listUsers();
    this.listClients();
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

  deleteUser(emp: Employee){
    let request: EmployeeRegisterRequest = {
      employees: []
    }
    request.employees.push(emp);
    this.api.deleteEmployee(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, complete: () => {
        this.listUsers();
      }
    });
  }

  listUsers(){
    this.api.listEmployees().subscribe(data => {
      this.dataService.listEmployees = data.data.personas;
      this.emps = data.data.personas;
      this.idcount =  Number(this.emps[this.emps.length - 1].idUsuario) + 1;
      for (const emp of this.emps) {
        emp.fechaAlta = emp.fechaAlta.substring(0,10);
        emp.fechaBaja = emp.fechaBaja.substring(0,10);
        emp.fechaNacimiento = emp.fechaNacimiento.substring(0,10);
      }
    });
  }

  listClients(){
    this.api.listClients().subscribe(data => {
      this.dataService.listClients = data.data.clientes;
      this.cls = data.data.clientes;
      this.idcountcl =  Number(this.cls[this.cls.length - 1].idEmpresa) + 1;
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
    this.dialogObj?.close();
  }

  asignarPuesto(idRol: number) {
    this.empObs.puestoPersona = this.listPuesto.find(puesto => puesto.rol === idRol.toString())!.nombre;
  }

  validarFormularioEmpleado(): boolean {
    if (!this.empObs.rutPersona || !this.empObs.nombrePersona || !this.empObs.idEmpresa || !this.empObs.estadoPersona || !this.empObs.idRol) {
      return false; // at least one required field is empty
    }
    return true; // all required fields have a value
  }

  createUser() {
    let request: EmployeeRegisterRequest = {
      employees: []
    }
    this.empObs.idUsuario = this.idcount.toString();
    this.empObs.fechaAlta = Date.now().toString();
    this.empObs.fechaNacimiento = Date.now().toString();
    this.empObs.fechaBaja = new Date().setFullYear(new Date().getFullYear() + 1).toString();
    this.empObs.password = "1234";
    request.employees.push(this.empObs);
    this.api.registerEmployee(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, complete: () => {
        this.listUsers();
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
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, complete: () => {
        this.listUsers();
      }
    });
  }

  validarFormularioCliente(): boolean {
    if (!this.clObs.nombreEmpresa || !this.clObs.direccionEmpresa || !this.clObs.fonoEmpresa || !this.clObs.emailEmpresa || !this.clObs.responsableEmpresa) {
      return false;
    }
    return true;
  }
}
