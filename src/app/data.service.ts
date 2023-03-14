import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Goal } from "./goal";
import { GameLocation } from "./location";
import { Match } from "./match";
import { Matchresult } from "./matchresult";
import { Group } from "./group";
import { Sportapp } from "./Sportapp";
import { Team } from "./team";

@Injectable()
export class DataService {
  leagues: Sportapp[] = [];
  matchesFromLeague: Match[] = [];

  header = {
    "Content-Type": "application/json"
  };

  constructor(public router: Router, public http: HttpClient, public ngZone: NgZone
  ) {
    this.leagues.push(new Sportapp(4442, "1. Fußballbundesliga", "bl1", 2020, false));
    this.leagues.push(new Sportapp(4446, "NFL 2020", "nfl2020", 2020, false));
    this.leagues.push(new Sportapp(4396, "Probe liga", "pb1", 2020, false));
    this.leagues.push(new Sportapp(4341, "NBA", "NBA18/19", 2019, false));
    this.leagues.push(new Sportapp(4454, "Eishockey Regionalliga Nord 2020/21", "regioNord", 2020, false));
    
  }

  // Liga öffnen aus Tabelle (klick auf Eintrag)
  openLeague(league: Sportapp) {
    // Auf Detail Seite navigieren
    this.router.navigate(["/match"], {
      queryParams: { league: league.shortcut, season: league.saison }
    });
  }

  // Liga Objekt finden zur weiteren benutzung
  findLeagueObjectByShortcut(shortcut: string, season: number): Sportapp {
    const array: Sportapp[] = this.leagues.filter(l => {
      return l.shortcut.includes(shortcut) && l.saison === season;
    });

    // console.log("findLeageByShortcut league array: ");
    // console.table(array);

    return array[0];
  }

  // Lade alle Spiele von einer Liga
  async loadMatchesFromLeague(
    _league: Sportapp,
    _spieltag?: Group
  ): Promise<Match[]> {
    let matches: Match[] = [];

    console.log("match laden: ");
    console.table(_league);

    // Daten aus API laden
    this.http
      .get(
        `https://www.openligadb.de/api/getmatchdata/${_league.shortcut}/${ _league.saison}`).subscribe(promiseDaten => {
        // Daten als any deklarieren damit .length fuktioniert
        let daten = promiseDaten as any;
        // Array "verarbeiten" um null aus ergebnisen zu filtern
        daten = this.arrayVerarbeiten(daten);

        // Komplette Liga aus API durchgehen und in lokal verwendbare Objekte umwandeln
        // Was ne drecks Arbeit
        for (let i = 0; i < daten.length; i++) {
          const matchId = daten[i]["MatchID"];
          const matchDateTime = daten[i]["MatchDateTime"];
          const timeZoneId = daten[i]["TimeZoneID"];
          const leagueId = daten[i]["LeagueId"];
          const leagueName = daten[i]["LeagueName"];
          const matchDateTimeUtc = daten[i]["MatchDateTimeUTC"];
          const group = new Group(
            daten[i]["Group"]["GroupName"],
            daten[i]["Group"]["GroupOrderID"],
            daten[i]["Group"]["GroupID"]
          );
          const team1 = new Team(
            daten[i]["Team1"]["TeamId"],
            daten[i]["Team1"]["TeamName"],
            daten[i]["Team1"]["ShortName"],
            daten[i]["Team1"]["TeamIconUrl"],
            daten[i]["Team1"]["TeamGroupName"]
          );
          const team2 = new Team(
            daten[i]["Team2"]["TeamId"],
            daten[i]["Team2"]["TeamName"],
            daten[i]["Team2"]["ShortName"],
            daten[i]["Team2"]["TeamIconUrl"],
            daten[i]["Team2"]["TeamGroupName"]
          );
          const lastUpdateDateTime = daten[i]["LastUpdateDateTime"];
          const matchIsFinished = JSON.parse(daten[i]["MatchIsFinished"]);

          const matchResults: Matchresult[] = [];
          for (let mr = 0; mr < daten[i]["MatchResults"].length; mr++) {
            matchResults.push(
              new Matchresult(
                daten[i]["MatchResults"][mr]["ResultID"],
                daten[i]["MatchResults"][mr]["ResultName"],
                daten[i]["MatchResults"][mr]["PointsTeam1"],
                daten[i]["MatchResults"][mr]["PointsTeam2"],
                daten[i]["MatchResults"][mr]["ResultOrderID"],
                daten[i]["MatchResults"][mr]["ResultTypeID"],
                daten[i]["MatchResults"][mr]["ResultDescription"]
              )
            );
          }
          const goals: Goal[] = [];
          for (let gl = 0; gl < daten[i]["Goals"].length; gl++) {
            goals.push(
              new Goal(
                daten[i]["Goals"][gl]["GoalID"],
                daten[i]["Goals"][gl]["ScoreTeam1"],
                daten[i]["Goals"][gl]["ScoreTeam2"],
                daten[i]["Goals"][gl]["MatchMinute"],
                daten[i]["Goals"][gl]["GoalGetterID"],
                daten[i]["Goals"][gl]["GoalGetterName"],
                daten[i]["Goals"][gl]["IsPenalty"],
                daten[i]["Goals"][gl]["IsOwnGoal"],
                daten[i]["Goals"][gl]["IsOvertime"],
                daten[i]["Goals"][gl]["Comment"]
              )
            );
          }

          const loc = new GameLocation(
            daten[i]["Location"]["LocationID"],
            daten[i]["Location"]["LocationCity"],
            daten[i]["Location"]["LocationStadium"]
          );
          const numberOfViewers = daten[i]["NumberOfViewers"];

          //
          // Match zusammenbauen
          //

          matches.push(
            new Match(
              matchId,
              matchDateTime,
              timeZoneId,
              leagueId,
              leagueName,
              matchDateTimeUtc,
              group,
              team1,
              team2,
              lastUpdateDateTime,
              matchIsFinished,
              matchResults,
              goals,
              loc,
              numberOfViewers
            )
          );
        }
        // return matches;
      });

    return matches;
  }

  // Array verarbeiten
  // überprüft jeden key im array auf null und ersetz den mit ""
  private arrayVerarbeiten(array) {
    for (var i in array) {
      var child = array[i];
      if (child === null) {
        array[i] = "";
      } else if (typeof child == "object") {
        this.arrayVerarbeiten(child);
      }
    }
    return array;
  }

  favoritAufTrue(favorits: boolean) {
   
    for (let i; this.leagues; i++) {
      if(i.favorit == favorits){
        i.favorit = true;
      }
      
    }
  }
}
