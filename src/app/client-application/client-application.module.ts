import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientApplicationRoutingModule } from './client-application-routing.module';
import { SharedModule } from './../shared/shared.module';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CitiesPageComponent } from './pages/cities-page/cities-page.component';
import { CityPageComponent } from './pages/city-page/city-page.component';
import { LandmarkPageComponent } from './pages/landmark-page/landmark-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { HeaderPortalComponent } from './components/header-portal/header-portal.component';
import { FooterPortalComponent } from './components/footer-portal/footer-portal.component';
import { BreadcrumbsMenuComponent } from './components/breadcrumbs-menu/breadcrumbs-menu.component';
import { CityListViewComponent } from './components/city-list-view/city-list-view.component';
import { LandmarkItemViewComponent } from './components/landmark-item-view/landmark-item-view.component';
import { LandmarkListViewComponent } from './components/landmark-list-view/landmark-list-view.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfileViewPageComponent } from './pages/profile-view-page/profile-view-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    CitiesPageComponent,
    CityPageComponent,
    LandmarkPageComponent,
    HeaderPortalComponent,
    FooterPortalComponent,
    BreadcrumbsMenuComponent,
    CityListViewComponent,
    LandmarkListViewComponent,
    LandmarkItemViewComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfileViewPageComponent
  ],
  imports: [
    CommonModule,
    ClientApplicationRoutingModule,
    SharedModule
  ]
})
export class ClientApplicationModule { }
