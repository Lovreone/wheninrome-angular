import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { RolesGuard } from './shared/services/auth/roles.guard';

import { LoginPageComponent } from './client-application/pages/login-page/login-page.component';
import { RegisterPageComponent } from './client-application/pages/register-page/register-page.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const AppRoutes: Routes = [
  {
    path: 'portal',
    loadChildren: () => import('./client-application/client-application.module').then(m => m.ClientApplicationModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule),
    canActivate: [AuthGuard, RolesGuard]
  },
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent, 
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterPageComponent, 
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
