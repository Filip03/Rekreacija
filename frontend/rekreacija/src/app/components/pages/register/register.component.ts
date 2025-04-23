import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent {
  user : any = {};
  errorMssg="";

  constructor(private registerService : RegisterService, private router : Router) { }

  register() {
    this.errorMssg = "";

    this.registerService.userRegister(this.user).subscribe({
      next: data => {
        alert("Registracija je uspješna!");
        this.router.navigateByUrl('/login');
      },
      error: err => {
        if (err.status === 409 || err.status === 406) {
          this.errorMssg = err.error; // backend poruka
        } else {
          this.errorMssg = "Došlo je do greške. Pokušajte ponovo.";
        }
      }
    });
  }
}
