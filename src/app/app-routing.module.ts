import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { UserAcitvityComponent } from './dashboard/user-acitvity/user-acitvity.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: '',
    component: UserAcitvityComponent,
    // redirectTo: '/dashboard/user-acitvity'
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/user-acitvity',
    component: UserAcitvityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard/user-acitvity',
  },
  { path: 'reset-password/:resetToken', component: ForgetPasswordComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
