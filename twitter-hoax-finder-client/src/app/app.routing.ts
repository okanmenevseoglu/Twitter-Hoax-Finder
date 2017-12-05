import {Routes} from "@angular/router";
import {RouterModule} from "@angular/router";
import {TextSearchComponent} from "./search/text-search/text-search.component";
import {ImageSearchComponent} from "./search/image-search/image-search.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
  {path: 'text-search', component: TextSearchComponent},
  {path: 'image-search', component: ImageSearchComponent},
];

export const appRoutingProviders: any[] = [];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
