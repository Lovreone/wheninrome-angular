import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { SharedModule } from './../shared/shared.module';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CitiesManageComponent } from './pages/cities-manage/cities-manage.component';
import { CityManageComponent } from './pages/city-manage/city-manage.component';
import { LandmarksManageComponent } from './pages/landmarks-manage/landmarks-manage.component';
import { LandmarkManageComponent } from './pages/landmark-manage/landmark-manage.component';

import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { CityListModifyComponent } from './components/city-list-modify/city-list-modify.component';
import { CityItemModifyComponent } from './components/city-item-modify/city-item-modify.component';
import { LandmarkListModifyComponent } from './components/landmark-list-modify/landmark-list-modify.component';
import { LandmarkItemModifyComponent } from './components/landmark-item-modify/landmark-item-modify.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CitiesManageComponent,
    CityManageComponent,
    LandmarksManageComponent,
    LandmarkManageComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    CityListModifyComponent,
    CityItemModifyComponent,
    LandmarkListModifyComponent, 
    LandmarkItemModifyComponent,
  ],
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    SharedModule
  ]
})
export class ContentManagementModule { }
