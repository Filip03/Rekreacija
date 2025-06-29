import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.API_URL}/login`

  constructor( private http: HttpClient ) { }
  userLogin(user:any){
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }
}
