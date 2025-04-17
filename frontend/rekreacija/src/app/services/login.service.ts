import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }
  userLogin(user:any){
    return this.http.post("http://localhost:8080/login", user, { responseType: 'text' });
  }
}
