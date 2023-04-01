import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {DataService} from "../../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, public dataService: DataService, private route: ActivatedRoute,
              public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.clearStorage();
    this.router.navigateByUrl('login');
  }

}
