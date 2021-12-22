import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthenticationComponent, data: { authType: 'login' } },
  { path: 'signup', component: AuthenticationComponent, data: { authType: 'signup' } },
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
