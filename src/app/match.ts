import { Goal } from "./goal";
import { GameLocation } from "./location";
import { Matchresult } from "./matchresult";
import { Group } from "./group";
import { Team } from "./team";

export class Match {
  constructor(
    public matchId?: number,
    public matchDateTime?: string,
    public timeZoneId?: string,
    public leagueId?: number,
    public leagueName?: string,
    public matchDateTimeUtc?: string,
    public group?: Group,
    public team1?: Team,
    public team2?: Team,
    public lastUpdateDateTime?: string,
    public matchIsFinished?: boolean,
    public matchResults?: Matchresult[],
    public goals?: Goal[],
    public location?: GameLocation,
    public numberOfViewers?: number
  ) {}
}
