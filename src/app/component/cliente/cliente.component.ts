import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RestService} from "../../service/rest.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Visit, VisitRegisterRequest} from "../../model/visita";
import {Contract, ContratoRegisterRequest} from "../../model/contrato";
import {Asistente, Cap, CapRegisterRequest} from "../../model/capacitaciones";
import {FormControl} from "@angular/forms";
import {Formulario} from "../../model/accidente";
import {Checklist, ChecklistRegisterRequest} from "../../model/checklist";
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require("pdfmake/build/vfs_fonts")
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  @ViewChild('Checklist', { static: false }) crearChecklistRef!: ElementRef;
  vsts: Array<Visit> = new Array<Visit>();
  cnts: Array<Contract> = new Array<Contract>();
  eps: Array<Formulario> = new Array<Formulario>();
  caps: Array<Cap> = new Array<Cap>();
  chks: Array<Checklist> = new Array<Checklist>();
  newChecklistItem: string = '';
  idCliente: number = 0;
  total: number = 0;
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

  cnt: Contract = {
    cantidadServicio: "0",
    cantidadVisita: "0",
    estadoContrato: "",
    fechaContrato: undefined,
    idClienteContrato: "",
    idContrato: 0
  }

  private dialogObj: MatDialogRef<any, any> | undefined;
  asistentes: Asistente[] = [];
  materiales: string = "Agregar Materiales Necesarios para la Capacitación Aquí";
  desc: string = "Detalles Visita";
  feccap = new FormControl(new Date());
  fecvis = new FormControl(new Date());
  feccon = new FormControl(new Date());


  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router, private api: RestService, public dialog: MatDialog) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

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

    this.api.listChecklists().subscribe(data => {
      this.dataService.listChecklists = data.data.checklists;
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
    this.cnt = {
      cantidadServicio: "",
      cantidadVisita: "",
      estadoContrato: "",
      fechaContrato: undefined,
      idClienteContrato: "",
      idContrato: 0
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

  loadChecklistItems() {
    const storedItems = localStorage.getItem('checklistItems');
    if (storedItems) {
      this.chks = JSON.parse(storedItems);
    }
  }

  addChecklist() {
    if (this.newChecklistItem.trim() !== '') {
      const newItem: Checklist = {
        comentario: "",
        estadoChecklist: "A",
        fechaCierre: new Date(this.vst.fechaVisita!),
        fechaCreacion: new Date(),
        fechaRevision: new Date(this.vst.fechaVisita!),
        id: 0,
        idCliente: this.dataService.clienteObservado.idEmpresa.toString(),
        idProfesional: this.dataService.usuarioObservado.id,
        nombreChecklist: this.newChecklistItem,
        idVisita: this.vst.idVisita.toString()
      };
      this.chks.push(newItem);
      this.newChecklistItem = '';
    }
  }

  removeChecklist(index: number) {
    this.chks.splice(index, 1);
  }

  selectVisita(vs: Visit) {
    this.vst = vs;
    this.chks = this.dataService.listChecklists.filter((checklist) => checklist.idVisita === this.vst.idVisita.toString());
  }

  saveChecklist() {
    let request: ChecklistRegisterRequest = {
      checklists: []
    }
    request.checklists = this.chks;
    this.api.registerChecklist(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      }, error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.emptyChecklist();
        this.closeDialog();
      }, complete: () => {
        this.emptyChecklist();
        this.listAll();
        this.closeDialog();
      }
    });
  }

  emptyChecklist() {
    this.chks = [];
  }

  exportChecklist(checklists: Checklist[]) {
    const tableRows = checklists.map((checklist) => [
      { text: checklist.id.toString(), alignment: 'center' },
      { text: checklist.estadoChecklist, alignment: 'center' },
      { text: checklist.comentario, alignment: 'left' },
      { text: checklist.idCliente, alignment: 'center' },
      { text: checklist.idProfesional, alignment: 'center' },
      { text: checklist.nombreChecklist, alignment: 'left' },
      { text: checklist.fechaCreacion.toString(), alignment: 'center' },
      { text: checklist.fechaRevision.toString(), alignment: 'center' },
      { text: checklist.fechaCierre.toString(), alignment: 'center' },
      { text: checklist.idVisita, alignment: 'center' },
    ]);

    const table = {
      headerRows: 1,
      widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: [
        [
          { text: 'ID', style: 'tableHeader', alignment: 'center' },
          { text: 'Estado', style: 'tableHeader', alignment: 'center' },
          { text: 'Comentario', style: 'tableHeader', alignment: 'center' },
          { text: 'ID Cliente', style: 'tableHeader', alignment: 'center' },
          { text: 'ID Profesional', style: 'tableHeader', alignment: 'center' },
          { text: 'Nombre Checklist', style: 'tableHeader', alignment: 'center' },
          { text: 'Fecha Creación', style: 'tableHeader', alignment: 'center' },
          { text: 'Fecha Revisión', style: 'tableHeader', alignment: 'center' },
          { text: 'Fecha Cierre', style: 'tableHeader', alignment: 'center' },
          { text: 'ID Visita', style: 'tableHeader', alignment: 'center' },
        ],
        ...tableRows
      ],
      style: 'table'
    };

    const documentDefinition = {
      content: [
        { text: 'Checklist Visita #' + this.chks[0].idVisita, style: 'header' },
        { table },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        table: { margin: [0, 5, 0, 15] },
        tableHeader: { bold: true, fillColor: '#CCCCCC', alignment: 'center' }
      },
      defaultStyle: {
        font: 'Roboto'
      },
      pageOrientation: 'landscape'
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  createContract() {
    let request: ContratoRegisterRequest = {
      contracts: []
    }
    this.cnt.estadoContrato = 'A';
    this.cnt.fechaContrato = this.feccon.value!;
    this.cnt.idClienteContrato = String(this.dataService.clienteObservado.idEmpresa);
    request.contracts.push(this.cnt);
    this.api.registerContrato(request).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
      },
      error: err => {
        this.snackBar.open(err, "OK!", {duration: 2000,
          verticalPosition: 'bottom', horizontalPosition: 'center'})
        this.closeDialog();
      },
      complete: () => {
        this.listAll();
        this.closeDialog();
      }
    });
  }

  goToActividad(vs: Visit) {
    this.dataService.checkListObservado = this.dataService.listChecklists.filter((checklist) => checklist.idVisita === vs.idVisita.toString());
    this.router.navigateByUrl('actividad')
  }

  prepContrato(ct: Contract) {
    this.cnt = ct;
    for (const v of this.vsts) {
      if(v.idEmpresa === this.dataService.clienteObservado.idEmpresa.toString()) {
        this.total += Number(v.valor);
      }
    }
    for (const c of this.caps) {
      if(c.idCliente === this.dataService.clienteObservado.idEmpresa.toString()) {
        this.total += c.valorServicio;
      }
    }
  }

  closeContract() {

  }
}

