import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Acc } from "../acc";
import { DataService } from "../data.service";
import { DataloginService } from "../datalogin.service";

@Component({
  selector: "app-startseite",
  templateUrl: "./startseite.component.html",
  styleUrls: ["./startseite.component.css"]
})
export class StartseiteComponent implements OnInit {
  ausgefuellt: boolean;
  loginAcc: Acc;

  constructor(
    private dataLoginService: DataloginService,
    public router: Router
  ) {
    this.loginAcc = new Acc();
  }

  ngOnInit() {}

  get loggedIn() {
    return this.dataLoginService.loggedIn;
  }

  login() {
    if (this.ausgefuellt = this.dataLoginService.login(this.loginAcc)) {
      console.log("login: " + this.ausgefuellt);
      this.toProfil();
    }
  }
  toProfil() {
    this.router.navigate(["/favoriten"]);
  }
}
