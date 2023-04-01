import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {StorageService} from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private storage: StorageService, private router: Router){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        if(!sessionStorage.getItem('currentUser')){
            this.router.navigateByUrl('login');
            return false;
        } else {
            return true;
        }
    }
}
