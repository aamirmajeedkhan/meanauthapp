import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
    { path: 'profile', component: ProfileComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);