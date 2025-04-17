import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    private apiUrl = 'http://localhost:8080/register';

  constructor( private http: HttpClient ) { }
  userRegister(user:any){
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }
}