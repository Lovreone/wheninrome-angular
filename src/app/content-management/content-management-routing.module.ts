import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CityManageComponent } from './pages/city-manage/city-manage.component';
import { CitiesManageComponent } from './pages/cities-manage/cities-manage.component';
import { LandmarksManageComponent } from './pages/landmarks-manage/landmarks-manage.component';
import { LandmarkManageComponent } from './pages/landmark-manage/landmark-manage.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'landmarks',
      children: [
            { path: '', component: LandmarksManageComponent }, 
            { path: 'create', component: LandmarkManageComponent },
            { path: 'modify/:landmarkId', component: LandmarkManageComponent },
      ]
    }, 
    { path: 'cities',
      children: [
        { path: '', component: CitiesManageComponent }, 
        { path: 'create', component: CityManageComponent },
        { path: 'modify/:landmarkId', component: CityManageComponent }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
