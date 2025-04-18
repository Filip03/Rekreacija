import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/helpers/header/header.component';
import { FooterComponent } from './components/helpers/footer/footer.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent
    ],

  bootstrap: [AppComponent],
  imports: [BrowserModule,
            AppRoutingModule,
            NgOptimizedImage,
            FormsModule,
            BrowserAnimationsModule
            ],
  providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
