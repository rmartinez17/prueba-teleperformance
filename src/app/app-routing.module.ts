//Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { UsersGuard } from './guards/users.guard';
//paginas
import { LoginComponent } from './pages/login/login.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate: [AuthGuard, AdminGuard],
    
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'purchases',
    component: PurchasesComponent,
    canActivate: [AuthGuard,UsersGuard,],
  },
  { path: 'no-access', component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
