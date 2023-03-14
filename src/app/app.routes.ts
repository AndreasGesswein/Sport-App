import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./detail/detail.component";
import { FavoritenComponent } from "./favoriten/favoriten.component";
import { FormComponent } from "./form/form.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { ListComponent } from "./list/list.component";
import { ProfilComponent } from "./profil/profil.component";
import { StartseiteComponent } from "./startseite/startseite.component";

const routes: Routes = [
  {
    path: "overview",
    component: ListComponent
  },
  {
    path: "registrieren",
    component: FormComponent
  },
  {
    path: "start",
    component: StartseiteComponent
  },
  {
    path: "profil",
    component: ProfilComponent
  },
  {
    path: "match",
    component: DetailComponent
  },
  {
    path: "imprint",
    component: ImpressumComponent
  },
  {
    path: "favoriten",
    component: FavoritenComponent
  },
  {
    path: "",
    redirectTo: "overview",
    pathMatch: "full"
  }
];
export const appRouterModule = RouterModule.forRoot(routes);
