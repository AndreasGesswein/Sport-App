import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "withivy";
  show = true;
}
const routes: Routes = [
  { path: "new", component: FormComponent },
  { path: "overview", component: ListComponent }
];
