import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    private apiUrl = `${environment.API_URL}/register`;

  constructor( private http: HttpClient ) { }
  userRegister(user:any){
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }
}