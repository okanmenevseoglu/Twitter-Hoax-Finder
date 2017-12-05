import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ResultComponent} from './result/result.component';
import {TextSearchComponent} from "./search/text-search/text-search.component";
import {ImageSearchComponent} from "./search/image-search/image-search.component";

import {ButtonModule} from 'primeng/primeng';
import {InputTextareaModule} from "primeng/primeng";
import {RadioButtonModule} from "primeng/primeng";
import {FileUploadModule} from "primeng/primeng";
import {GrowlModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {appRoutingProviders} from "./app.routing";
import {RoutingModule} from "./app.routing";
import {HashLocationStrategy} from "@angular/common";
import {LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent,
    ResultComponent,
    TextSearchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule,
    RadioButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RoutingModule,
    FileUploadModule,
    GrowlModule
  ],
  providers: [appRoutingProviders,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
