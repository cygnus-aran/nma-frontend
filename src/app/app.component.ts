import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {LoadingService} from "./service/loading.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nma-frontend';
  loading: boolean = false;
  constructor(public loginService: LoginService, private _loading: LoadingService) { }

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
    this._loading.loadingSub.pipe(delay(0)).subscribe(
      (loading) => {
        this.loading = loading;
      });
  }
}
