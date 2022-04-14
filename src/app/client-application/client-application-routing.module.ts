import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CitiesViewComponent } from './pages/cities-view/cities-view.component';
import { LandmarkViewComponent } from './pages/landmark-view/landmark-view.component';
import { LandmarksViewComponent } from './pages/landmarks-view/landmarks-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'cities', pathMatch: 'full' },
  { path: 'cities', 
    children: [
      { path: '', component: CitiesViewComponent },
      { path: ':citySlug', component: LandmarksViewComponent },
      // { path: ':citySlug/:landmarkSlug', component: LandmarkViewComponent }
    ]
  },
  { path: 'landmarks',
    children: [
      { path: 'view/:landmarkSlug', component: LandmarkViewComponent }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientApplicationRoutingModule { }
