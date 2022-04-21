import { ClientApplicationRoutingModule } from './client-application-routing.module';
import { SharedModule } from './../shared/shared.module';
import { LandmarkPageComponent } from './pages/landmark-page/landmark-page.component';
import { CityPageComponent } from './pages/city-page/city-page.component';
import { LandmarkItemViewComponent } from './components/landmark-item-view/landmark-item-view.component';
import { LandmarkListViewComponent } from './components/landmark-list-view/landmark-list-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPortalComponent } from './components/header-portal/header-portal.component';
import { FooterPortalComponent } from './components/footer-portal/footer-portal.component';
import { CitiesPageComponent } from './pages/cities-page/cities-page.component';
import { CityListViewComponent } from './components/city-list-view/city-list-view.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BreadcrumbsMenuComponent } from './components/breadcrumbs-menu/breadcrumbs-menu.component';


@NgModule({
  declarations: [
    LandmarkListViewComponent,
    LandmarkItemViewComponent,
    CityPageComponent,
    LandmarkPageComponent,
    HeaderPortalComponent,
    FooterPortalComponent,
    CitiesPageComponent,
    CityListViewComponent,
    HomePageComponent,
    BreadcrumbsMenuComponent
  ],
  imports: [
    CommonModule,
    ClientApplicationRoutingModule,
    SharedModule
  ]
})
export class ClientApplicationModule { }
