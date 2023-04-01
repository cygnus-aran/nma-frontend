import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./service/auth-guard.service";
import {LoginComponent} from "./component/login/login/login.component";
import {HomeComponent} from "./component/home/home/home.component";

const routes: Routes = [  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
