import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registrationmanagement/registration/registration.component';
import { WelcomepageComponent } from './components/shared-component-management/welcomepage/welcomepage.component';
import { RegistrationsuccessComponent } from './components/registrationmanagement/registrationsuccess/registrationsuccess.component';
import { ListUserComponent } from './components/user-management/list-user/list-user.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-management/user-profile/user-profile.component';
import { LoginGuard } from './services/guard/login.guard';
import { LogoutGuard } from './services/guard/logout.guard';
import { DashbordUserComponent } from './components/user-management/dashbord-user/dashbord-user.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomepageComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'registrationsuccess', component: RegistrationsuccessComponent},
  { path: 'listuser', component: ListUserComponent, canActivate:[LoginGuard]},
  { path: 'dashborduser', component: DashbordUserComponent, canActivate:[LoginGuard]},
  { path: 'updateuserprofile', component: UserProfileComponent,canActivate:[LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];
