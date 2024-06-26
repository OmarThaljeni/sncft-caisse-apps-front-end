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
import { ListBankComponent } from './components/bank-management/list-bank/list-bank.component';
import { CreateBankComponent } from './components/bank-management/create-bank/create-bank.component';
import { UpdateBankComponent } from './components/bank-management/update-bank/update-bank.component';
import { ListTransactionComponent } from './components/transaction-mgt/list-transaction/list-transaction.component';
import { ListEncaissmentComponent } from './components/encaissment-mgt/list-encaissment/list-encaissment.component';
import { ListDecaissementComponent } from './components/decaissment-mgt/list-decaissement/list-decaissement.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomepageComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'registrationsuccess', component: RegistrationsuccessComponent},
  { path: 'listuser', component: ListUserComponent, canActivate:[LoginGuard]},
  { path: 'dashborduser', component: DashbordUserComponent, canActivate:[LoginGuard]},
  { path: 'updateuserprofile', component: UserProfileComponent,canActivate:[LoginGuard] },
  { path: 'listbank', component: ListBankComponent,canActivate:[LoginGuard] },
  { path: 'create-bank', component: CreateBankComponent,canActivate:[LoginGuard] },
  { path: 'update-bank', component: UpdateBankComponent,canActivate:[LoginGuard] },
  { path: 'listbank', component: ListBankComponent,canActivate:[LoginGuard] },
  { path: 'list-trsanscation', component: ListTransactionComponent,canActivate:[LoginGuard] },
  { path: 'list-encaissment', component: ListEncaissmentComponent,canActivate:[LoginGuard] },
  { path: 'list-decaissment', component: ListDecaissementComponent,canActivate:[LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];
