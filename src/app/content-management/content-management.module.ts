import { ContentManagementRoutingModule } from './content-management-routing.module';
import { SharedModule } from './../shared/shared.module';
import { LandmarkManageComponent } from './pages/landmark-manage/landmark-manage.component';
import { LandmarksManageComponent } from './pages/landmarks-manage/landmarks-manage.component';
import { LandmarkItemModifyComponent } from './components/landmark-item-modify/landmark-item-modify.component';
import { LandmarkListModifyComponent } from './components/landmark-list-modify/landmark-list-modify.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';



@NgModule({
  declarations: [
    LandmarkListModifyComponent, 
    LandmarkItemModifyComponent,
    LandmarksManageComponent,
    LandmarkManageComponent,
    FooterAdminComponent,
    HeaderAdminComponent,
  ],
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    SharedModule
  ]
})
export class ContentManagementModule { }
