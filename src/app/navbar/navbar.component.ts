import { Component, OnInit } from "@angular/core";
import { DataloginService } from "../datalogin.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public loginService: DataloginService) {}

  get loggedIn() {
    return this.loginService.loggedIn;
  }

  logout() {
    this.loginService.logout();
  }

  ngOnInit() {}
}
