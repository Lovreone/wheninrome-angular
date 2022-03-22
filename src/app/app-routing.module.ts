import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const AppRoutes: Routes = [
  {
    path: 'portal',
    loadChildren: () => import('./client-application/client-application.module').then(m => m.ClientApplicationModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule)
  },
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full'
  },
  { 
    path: '**',  // Wildcard route for a 404 page
    component: PageNotFoundComponent 
  },
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
