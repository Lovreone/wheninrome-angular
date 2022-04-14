import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CitiesViewComponent } from './pages/cities-view/cities-view.component';
import { LandmarkViewComponent } from './pages/landmark-view/landmark-view.component';
import { LandmarksViewComponent } from './pages/landmarks-view/landmarks-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: HomePageComponent },
  { path: 'cities', 
    children: [
      { path: '', component: CitiesViewComponent },
      { path: ':citySlug', component: LandmarksViewComponent },
      // { path: ':citySlug/:landmarkSlug', component: LandmarkViewComponent } // TODO: Rethink if necessary or delete
    ]
  },
  { path: 'landmarks/:landmarkSlug', component: LandmarkViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientApplicationRoutingModule { }
