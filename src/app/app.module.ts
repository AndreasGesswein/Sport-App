import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { FormComponent } from "./form/form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./data.service";
import { appRouterModule } from "./app.routes";
import { DetailComponent } from "./detail/detail.component";
import { FooterComponent } from './footer/footer.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { DataloginService } from './datalogin.service';
import { ProfilComponent } from './profil/profil.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { FavoritenComponent } from './favoriten/favoriten.component';
import { PersonlicheFavoritenService } from './personliche-favoriten.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, appRouterModule],
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    NavbarComponent,
    DetailComponent,
    FooterComponent,
    StartseiteComponent,
    ProfilComponent,
    ImpressumComponent,
    FavoritenComponent
  ],
  bootstrap: [AppComponent],
  providers: [DataService, DataloginService, PersonlicheFavoritenService]
})
export class AppModule {}
