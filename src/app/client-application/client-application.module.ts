import { ClientApplicationRoutingModule } from './client-application-routing.module';
import { SharedModule } from './../shared/shared.module';
import { LandmarkViewComponent } from './pages/landmark-view/landmark-view.component';
import { LandmarksViewComponent } from './pages/landmarks-view/landmarks-view.component';
import { LandmarkItemViewComponent } from './components/landmark-item-view/landmark-item-view.component';
import { LandmarkListViewComponent } from './components/landmark-list-view/landmark-list-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPortalComponent } from './components/header-portal/header-portal.component';
import { FooterPortalComponent } from './components/footer-portal/footer-portal.component';
import { CitiesViewComponent } from './pages/cities-view/cities-view.component';
import { CityListViewComponent } from './components/city-list-view/city-list-view.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BreadcrumbsMenuComponent } from './components/breadcrumbs-menu/breadcrumbs-menu.component';


@NgModule({
  declarations: [
    LandmarkListViewComponent,
    LandmarkItemViewComponent,
    LandmarksViewComponent,
    LandmarkViewComponent,
    HeaderPortalComponent,
    FooterPortalComponent,
    CitiesViewComponent,
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
