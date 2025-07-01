import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/pages/login/login.component";
import { RegisterComponent } from "./components/pages/register/register.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { ObavjestenjaComponent } from './components/pages/obavjestenja/obavjestenja.component';
import { TerenComponent } from './components/pages/teren/teren.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { TeamComponent } from './components/pages/team/team.component';
import { authGuard } from "./guards/auth.guard";
import { warnGuard } from "./guards/warn.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canDeactivate:[warnGuard]},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'obavjestenja', component: ObavjestenjaComponent, canActivate:[authGuard]},
  {path: 'teren', component: TerenComponent, canActivate:[authGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[authGuard]},
  {path: 'ekipa', component: TeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
