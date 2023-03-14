import { Component, OnInit } from "@angular/core";
import { Acc } from "../acc";
import { DataloginService } from "../datalogin.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  newAcc: Acc;
  ausgefuellt: boolean;

  constructor(private dataLoginService: DataloginService) {
    this.newAcc = new Acc();
  }

  ngOnInit() {}

  save() {
    console.log("reg clicked");
    this.ausgefuellt = this.dataLoginService.addAcc(this.newAcc);
  }
}
