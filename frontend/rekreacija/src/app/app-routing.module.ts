import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/pages/login/login.component";
import { RegisterComponent } from "./components/pages/register/register.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { TerenComponent } from './components/pages/teren/teren.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { TeamComponent } from './components/pages/team/team.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
import { authGuard } from "./guards/auth.guard";
import { warnGuard } from "./guards/warn.guard";
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RezervacijaComponent } from './components/pages/rezervacija/rezervacija.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canDeactivate:[warnGuard]},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'teren', component: TerenComponent, canActivate:[authGuard]},
  {path: 'admin/:id', component: AdminComponent, canActivate:[authGuard]},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'ekipa', component: TeamComponent, canActivate:[authGuard]},
  {path: 'profil', component: ProfileComponent, canActivate:[authGuard]}
  {path: 'rezervacija/:id', component: RezervacijaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
