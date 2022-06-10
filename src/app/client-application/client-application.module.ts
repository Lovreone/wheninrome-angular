import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientApplicationRoutingModule } from './client-application-routing.module';
import { SharedModule } from './../shared/shared.module';
// Portal Pages:
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CitiesPageComponent } from './pages/cities-page/cities-page.component';
import { CityPageComponent } from './pages/city-page/city-page.component';
import { LandmarkPageComponent } from './pages/landmark-page/landmark-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ToursManagePageComponent } from './pages/tours-manage-page/tours-manage-page.component';
import { TourManagePageComponent } from './pages/tour-manage-page/tour-manage-page.component';
import { TourViewPageComponent } from './pages/tour-view-page/tour-view-page.component';
// Portal Components:
import { HeaderPortalComponent } from './components/header-portal/header-portal.component';
import { FooterPortalComponent } from './components/footer-portal/footer-portal.component';
import { BreadcrumbsMenuComponent } from './components/breadcrumbs-menu/breadcrumbs-menu.component';
import { CityListViewComponent } from './components/city-list-view/city-list-view.component';
import { LandmarkItemViewComponent } from './components/landmark-item-view/landmark-item-view.component';
import { LandmarkListViewComponent } from './components/landmark-list-view/landmark-list-view.component';
import { ProfileModifyComponent } from './components/profile-modify/profile-modify.component';
import { TourListModifyComponent } from './components/tour-list-modify/tour-list-modify.component';
import { TourItemModifyComponent } from './components/tour-item-modify/tour-item-modify.component';

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
    ProfilePageComponent,
    ProfileModifyComponent,
    ToursManagePageComponent,
    TourManagePageComponent,
    TourListModifyComponent,
    TourItemModifyComponent,
    TourViewPageComponent
  ],
  imports: [
    CommonModule,
    ClientApplicationRoutingModule,
    SharedModule
  ]
})
export class ClientApplicationModule { }
