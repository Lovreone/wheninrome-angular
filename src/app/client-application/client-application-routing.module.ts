import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { LandmarkViewComponent } from './pages/landmark-view/landmark-view.component';
import { LandmarksViewComponent } from './pages/landmarks-view/landmarks-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'landmarks', pathMatch: 'full' },
    { path: 'landmarks',
      children: [
        { path: '', component: LandmarksViewComponent },
        { path: 'view/:landmarkId', component: LandmarkViewComponent }
      ]
    },
    // { path: 'landmarks', component: LandmarksViewComponent },
    // { path: 'landmarks/view/:landmarkId', component: LandmarkViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientApplicationRoutingModule { }
