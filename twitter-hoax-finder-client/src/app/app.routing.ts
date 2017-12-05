import {Routes} from "@angular/router";
import {RouterModule} from "@angular/router";
import {TextSearchComponent} from "./search/text-search/text-search.component";
import {ImageSearchComponent} from "./search/image-search/image-search.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
  {path: '', component: TextSearchComponent, pathMatch: 'full'},
  {path: 'image-search', component: ImageSearchComponent, pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
