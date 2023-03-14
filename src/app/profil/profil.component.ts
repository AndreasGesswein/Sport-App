import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { PersonlicheFavoritenService } from "../personliche-favoriten.service";
import { Sportapp } from "../Sportapp";


@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"]
})
export class ProfilComponent implements OnInit {
  bildURL: String;
  
  constructor(
    public personalFavorits: PersonlicheFavoritenService,
    public dataservice: DataService
  ) {}

  ngOnInit() {}

  get favoriten(): Sportapp[] {
    return this.personalFavorits.leagues;
  }
  openLeagueDetail(league: Sportapp) {
    this.dataservice.openLeague(league);
  }
  favoritenEntfernen(zuLoschenderFavorit: Sportapp) {
    this.personalFavorits.removeGame(zuLoschenderFavorit);
  }
  profilBild(url: string){
     this.bildURL = url;

  }
}
