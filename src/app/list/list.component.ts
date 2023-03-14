import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { DataloginService } from "../datalogin.service";
import { League } from "../league";
import { PersonlicheFavoritenService } from "../personliche-favoriten.service";
import { Sportapp } from "../Sportapp";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  constructor(
    public dataservice: DataService,
    public personalfavorits: PersonlicheFavoritenService,
    private dataLoginService: DataloginService,
    public router: Router
  ) {}

  ngOnInit() {}

  openLeagueDetail(league: Sportapp) {
    this.dataservice.openLeague(league);
  }

  get sportapp(): Sportapp[] {
    return this.dataservice.leagues;
  }

  favoritenZuProfilHinzufuegen(s: Sportapp) {
    if (this.dataLoginService.loggedIn) {
      if (s.favorit == false) {
        s.favorit = true;
        this.personalfavorits.pushFavoriten(s);
      } else if (s.favorit == true) {
        s.favorit = false;
        this.personalfavorits.pushFavoriten(s);
      }
    }else if(!this.dataLoginService.loggedIn) {
      this.router.navigate(["/start"]);
    }
  }
}
