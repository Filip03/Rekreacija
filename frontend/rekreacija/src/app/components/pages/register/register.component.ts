import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user : any = {};

  constructor(private registerService : RegisterService){ }

  register(){
    this.registerService.userRegister(this.user).subscribe(data => {
      this.user = data;
    })
  }

}
