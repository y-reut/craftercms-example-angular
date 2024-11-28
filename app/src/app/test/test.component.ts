import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseIceComponent } from "../lib/BaseIceComponent";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"],
})
export class TestComponent extends BaseIceComponent implements OnInit {
  constructor(router: Router) {
    super(router);
  }
}
