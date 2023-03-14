import { Injectable } from "@angular/core";
import { Sportapp } from "./Sportapp";

@Injectable()
export class PersonlicheFavoritenService {
  leagues: Sportapp[] = [];
  constructor() {}

  pushFavoriten(favorit: Sportapp) {
    this.leagues.push(favorit);
  }
  removeGame(zuLoschenderFavorit: Sportapp) {
    zuLoschenderFavorit.favorit = false;
    this.leagues = this.leagues.filter(
      g => g.favorit !== zuLoschenderFavorit.favorit
    );
  }
}
