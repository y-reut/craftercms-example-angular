import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { NgAttributesDirective } from "./ng-attributes.directive";
import { TestComponent } from "src/app/test/test.component";
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NgAttributesDirective,
    TestComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
