import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Acc } from "./acc";

@Injectable()
export class DataloginService {
  acc: Acc[] = [];
  ausgefuellt: boolean;
  loggedIn: boolean = false;
  activeAccount: number;

  constructor(public router: Router) {
    // Wenn localStorage accounts leer ist dann anlegen und in lokales acc Array speichern
    if (
      !localStorage.getItem("accounts") ||
      localStorage.getItem("accounts") == "undefined"
    ) {
      this.acc.push(new Acc("Andreas", "123", "123"));
      this.acc.push(new Acc("test", "test", "test"));
      localStorage.setItem("accounts", JSON.stringify(this.acc));
    } else {
      // acc aus localStorage laden
      this.acc = JSON.parse(localStorage.getItem("accounts"));
    }

    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
      // localStorage.setItem(
      //   "activeAccountID",
      //   JSON.stringify(this.activeAccount)
      // );
    } else {
      //
      // TODO
      //

      const _lSloggedIn = JSON.parse(localStorage.getItem("loggedIn"));
      const _lSactiveAccount = JSON.parse(
        localStorage.getItem("activeAccountID")
      );

      if (_lSloggedIn === undefined) {
        this.loggedIn = false;
      } else {
        this.loggedIn = _lSloggedIn;
      }

      if (!_lSactiveAccount === undefined) {
        this.activeAccount = _lSactiveAccount;
      }

      // this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
      // this.activeAccount = JSON.parse(localStorage.getItem("activeAccountID"));
    }
  }

  addAcc(newAcc: Acc): boolean {
    if (
      newAcc.benutzer != null &&
      newAcc.password == newAcc.passwordBestaetigung &&
      newAcc.password != null &&
      newAcc.passwordBestaetigung != null
    ) {
      console.table(newAcc);
      // Account zum lokalen Array hinzufügen
      this.acc.push(newAcc);
      // komplettes Array wieder im localStorage speichern
      localStorage.setItem("accounts", JSON.stringify(this.acc));
      console.table(this.acc);
      this.router.navigate(["/start"]);
      return true;
    } else {
      return false;
    }
  }

  login(loginAcc: Acc): boolean {
    for (let i of this.acc) {
      if (loginAcc.benutzer == i.benutzer && loginAcc.password == i.password) {
        this.loggedIn = true;
        localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));

        // Index aus acc Array für eingeloggten Benutzer finden und in localStorage
        // "activeAccountID" speichern für automatischen login nach Seitenrefresh
        let accid: number;
        for (let i = 0; i < this.acc.length; i++) {
          if (this.acc[i].benutzer === loginAcc.benutzer) {
            accid = i;
          }
        }
        localStorage.setItem("activeAccountID", accid.toString());

        return true;
      }
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    this.activeAccount = null;
    localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
    localStorage.removeItem("activeAccountID");
  }
}
