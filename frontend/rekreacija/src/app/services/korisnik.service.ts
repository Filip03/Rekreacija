import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  username: string;
  phone_number: string;
  date_of_registration: string;
}

export interface UserUpdateData {
  username: string;
  phone_number: string;
}

@Injectable({
  providedIn: 'root'
})

export class KorisnikService {
    private apiUrl = `${environment.API_URL}/api/korisnik`

    constructor(private http: HttpClient){}

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/profil`)
    }

    upditeProfile(data: UserUpdateData): Observable<any> {
        return this.http.put(`${this.apiUrl}/profil/update`, data)
    }

  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined' && typeof sessionStorage !== 'undefined') {
      // Proveravamo da li stari token postoji u localStorage
      if (localStorage.getItem('token')) {
        // Ako da, novi token čuvamo na isto mesto
        localStorage.setItem('token', token);
      }
      // Proveravamo da li stari token postoji u sessionStorage
      else if (sessionStorage.getItem('token')) {
        // Ako da, novi token čuvamo tamo
        sessionStorage.setItem('token', token);
      }
      // Ako token ne postoji nigde (malo verovatan slučaj ovde, ali dobra praksa),
      // možemo ga sačuvati na podrazumevano mesto, npr. sessionStorage.
      else {
        sessionStorage.setItem('token', token);
      }
    } else {
      console.warn('Storage is not available. Cannot save token.');
    }
  }
}