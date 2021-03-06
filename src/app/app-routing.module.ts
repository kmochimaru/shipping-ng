import { UnauthorizedComponent } from './auth/pages/unauthorized/unauthorized.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_URL } from './app-url';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: APP_URL.LOGIN, pathMatch: 'full' },
  { path: APP_URL.LOGIN, component: LoginComponent },
  {
    path: APP_URL.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard],
  },
  { path: APP_URL.UNAUTHORIZED, component: UnauthorizedComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
