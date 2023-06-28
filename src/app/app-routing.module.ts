import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./service/auth-guard.service";
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {ClienteComponent} from "./component/cliente/cliente.component";
import {AccidenteComponent} from "./component/accidente/accidente.component";
import {ActividadComponent} from "./component/actividad/actividad.component";
import {FacturaComponent} from "./component/factura/factura.component";

const routes: Routes = [  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]},
  { path: 'cliente', component: ClienteComponent,
    canActivate: [AuthGuard]},
  { path: 'accidente', component: AccidenteComponent,
    canActivate: [AuthGuard]},
  { path: 'actividad', component: ActividadComponent,
    canActivate: [AuthGuard]},
  { path: 'factura', component: FacturaComponent,
    canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
