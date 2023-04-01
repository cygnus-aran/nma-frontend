import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    setToken(token: string){
        sessionStorage.setItem('token', token);
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    clearStorage(){
        sessionStorage.clear();
    }

}
