import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth/auth.guard';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CitiesPageComponent } from './pages/cities-page/cities-page.component';
import { CityPageComponent } from './pages/city-page/city-page.component';
import { LandmarkPageComponent } from './pages/landmark-page/landmark-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ToursManagePageComponent } from './pages/tours-manage-page/tours-manage-page.component';
import { TourManagePageComponent } from './pages/tour-manage-page/tour-manage-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: HomePageComponent },
  { path: 'cities', 
    children: [
      { path: '', component: CitiesPageComponent },
      { path: ':citySlug', component: CityPageComponent },
      { path: ':citySlug/:landmarkSlug', component: LandmarkPageComponent }
    ]
  },
  { path: 'user-profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'my-tours', component: ToursManagePageComponent, canActivate: [AuthGuard] },
  { path: 'my-tour', component: TourManagePageComponent, canActivate: [AuthGuard] }, // FIXME: Rethink url

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientApplicationRoutingModule { }
