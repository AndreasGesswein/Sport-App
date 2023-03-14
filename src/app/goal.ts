export class Goal {
  constructor(
    public goalId?: number,
    public scoreTeam1?: number,
    public scoreTeam2?: number,
    public matchMinute?: number,
    public goalGetterId?: number,
    public goalGetterName?: string,
    public isPenalty?: boolean,
    public isOwnGoal?: boolean,
    public isOvertime?: boolean,
    public comment?: string
  ) {}
}
