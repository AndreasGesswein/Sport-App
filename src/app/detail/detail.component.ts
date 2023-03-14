import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";
import { DataService } from "../data.service";
import { Goal } from "../goal";
import { Group } from "../group";
import { League } from "../league";
import { Match } from "../match";
import { Spieltag } from "../spieltag";
import { Sportapp } from "../Sportapp";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  providedLeagueShortcut: string;
  providedSeason: string;

  activeLeague: Sportapp;
  matches: Match[] = [];
  ausgewaehltesMatch: Match;
  spieltag: Spieltag[] = [];

  constructor(public route: ActivatedRoute, public dataSerivce: DataService) {}

  async loadDetails() {
    // gewählte liga und saison aus url finden
    this.activeLeague = this.dataSerivce.findLeagueObjectByShortcut(
      this.providedLeagueShortcut,
      Number(this.providedSeason)
    );

    // console.log("matched League:");
    // console.table(this.activeLeague);

    // this.matches = await this.dataSerivce.loadMatchesFromLeague(
    //   this.activeLeague
    // );

    this.dataSerivce.loadMatchesFromLeague(this.activeLeague).then(d => {
      this.matches = d;
    });

    this.sortMatchesByMatchDay();
    // if (this.matches.length > 0) {
    // }
  }

  toreVonTeam(teamID: number) {
    let goals: Goal[] = [];

    let scoreTeam1 = 0;
    let scoreTeam2 = 0;

    this.ausgewaehltesMatch.goals.forEach(g => {
      if (scoreTeam1 < g.scoreTeam1 && teamID === 1) {
        scoreTeam1++;
        goals.push(g);
      } else if (scoreTeam2 < g.scoreTeam2 && teamID === 2) {
        scoreTeam2++;
        goals.push(g);
      }
    });

    return goals;
  }

  tagAuswaehlen(match: Match) {
    this.ausgewaehltesMatch = match;
  }

  // Matches aus datenarray in einzelne arrays nach spieltag sortieren
  groupByKey(array, key) {
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }

  sortMatchesByMatchDay() {
    /**let uniqueValues: number[] = [];
    for(let match: this.matches) {
      if (uniqueValues contain)
    }*/
    let vals: number[] = [];
    console.log(JSON.stringify(this.matches));
    this.matches
      .map(m => m.group.groupOrderID)
      .forEach(id => {
        console.log(id);
        if (vals.indexOf(id) == -1) {
          vals.push(id);
        }
      });
    console.log(vals);
    // for (let i = 1; i < 100; i++) {
    //   this.groupByKey(this.matches, group.[i])
    // }
    // Maximale Anzahl an Spieltagen herausfinden
    // const maxid = this.matches.reduce(
    //   (max, match) =>
    //     match.group.groupOrderID > max ? match.group.groupOrderID : max,
    //   this.matches[0].group.groupOrderID
    // );
    // let maxid = Math.max(
    //   ...this.matches.map(match => match.group.groupOrderID)
    // );
    // const maxMatchDays = Math.max.apply(
    //   Math,
    //   this.matches.map(function(o) {
    //     return o.group.groupOrderID;
    //   })
    // );
    // console.log(maxid);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Debug parameter
      // console.table(params);

      // URL Parameter in properties schmeißen
      this.providedLeagueShortcut = params["league"];
      this.providedSeason = params["season"];
      // Debug
      // console.log(this.providedLeagueShortcut + ", " + this.providedSeason);

      // Daten aus API Laden beim queryParams update (seite neuladen z.b.)
      this.loadDetails();
    });
  }
}
