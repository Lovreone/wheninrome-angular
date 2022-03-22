import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { LandmarkManageComponent } from './pages/landmark-manage/landmark-manage.component';
import { LandmarksManageComponent } from './pages/landmarks-manage/landmarks-manage.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: LandmarksManageComponent },
    { path: 'landmarks',
      children: [
            { path: '', component: LandmarksManageComponent }, 
            { path: 'create', component: LandmarkManageComponent },
            { path: 'modify/:landmarkId', component: LandmarkManageComponent },
      ]
    },
    // { path: 'landmarks', component: LandmarksManageComponent },
    // { path: 'landmarks/create', component: LandmarkManageComponent },
    // { path: 'landmarks/modify/:landmarkId', component: LandmarkManageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
