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



@NgModule({
  declarations: [
    LandmarkListViewComponent,
    LandmarkItemViewComponent,
    LandmarksViewComponent,
    LandmarkViewComponent,
    HeaderPortalComponent,
    FooterPortalComponent,
  ],
  imports: [
    CommonModule,
    ClientApplicationRoutingModule,
    SharedModule
  ]
})
export class ClientApplicationModule { }
