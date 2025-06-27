import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/helpers/header/header.component';
import { FooterComponent } from './components/helpers/footer/footer.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NgOptimizedImage, CommonModule} from "@angular/common";
import { FormsModule} from "@angular/forms";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi, HttpClientModule, HttpClient} from "@angular/common/http";
import { authInterceptor} from "./interceptors/auth.interceptor";
import { ObavjestenjaComponent } from './components/pages/obavjestenja/obavjestenja.component';
import {AuthModalComponent} from "./modals/auth-modal/auth-modal.component";
import { TerenComponent } from './components/pages/teren/teren.component';
import { LinkifyPipe } from './pipes/linkify.pipe';

@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        ObavjestenjaComponent,
        TerenComponent
    ],

  bootstrap: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule, AuthModalComponent,
    HttpClientModule,
    LinkifyPipe
  ],
  providers: [provideHttpClient(withInterceptors([
              authInterceptor
              ])
      )]
})
export class AppModule { }
