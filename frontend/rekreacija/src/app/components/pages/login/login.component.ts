import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  user:any={}
  errorMssg = '';
  constructor(private loginService: LoginService, private router: Router, private tokenService: TokenService) { }
  login(){
    this.errorMssg='';
    this.loginService.userLogin(this.user).subscribe({
      next: (token: string) => {
        if (this.user.rememberMe) {
          localStorage.setItem('token', token);  // Zapamti me → dugoročno
        } else {
          sessionStorage.setItem('token', token); // Ne pamti → do zatvaranja taba
        }
        this.tokenService.updateToken();
        this.router.navigateByUrl('/');
      },
      error: err => {
        if (err.status === 401) {
          this.errorMssg = 'Korisničko ime ili lozinka nisu ispravni.';
        } else {
          this.errorMssg = 'Došlo je do greške. Pokušajte ponovo.';
        }
      }
    });
  }
}
