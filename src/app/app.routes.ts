import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
