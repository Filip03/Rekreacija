import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {Router} from "@angular/router";
import {WarnableComponent} from "../../../guards/warn.guard";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements WarnableComponent {

  user : any = {
    type_id : 1
  };
  errorMssg="";
  originalUser: any = {};

  constructor(private registerService : RegisterService, private router : Router) {
    this.originalUser = { ...this.user };
  }

  register() {
    this.errorMssg = "";

    this.registerService.userRegister(this.user).subscribe({
      next: data => {
        alert("Registracija je uspješna!");
        this.user = {};
        this.originalUser = {};
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

  hasUnsavedChanges(): boolean {
    return JSON.stringify(this.originalUser) !== JSON.stringify(this.user);
  }
}
