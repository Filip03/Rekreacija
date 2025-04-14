import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user:any={}
  constructor(private loginService: LoginService) { }
  login(){
    this.loginService.userLogin(this.user).subscribe(data => alert("Prijava je uspjesna"));
  }
}
