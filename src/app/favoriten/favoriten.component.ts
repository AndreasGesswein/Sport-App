import { Component, OnInit } from "@angular/core";
import { PersonlicheFavoritenService } from "../personliche-favoriten.service";
import { Sportapp } from "../Sportapp";

@Component({
  selector: "app-favoriten",
  templateUrl: "./favoriten.component.html",
  styleUrls: ["./favoriten.component.css"]
})
export class FavoritenComponent implements OnInit {
  constructor(public personalFavorits: PersonlicheFavoritenService) {}

  ngOnInit() {}
  get favoriten(): Sportapp[] {
    return this.personalFavorits.leagues;
  }
}
