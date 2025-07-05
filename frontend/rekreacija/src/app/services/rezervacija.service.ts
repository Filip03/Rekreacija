import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rezervacija } from '../models/rezervacija';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {
  private apiUrl = `${environment.API_URL}/api/rezervacija`;

  constructor(private http: HttpClient) { }

  insertRezervacija(rezervacija: Rezervacija): Observable<any> {
    return this.http.post(`${this.apiUrl}`, rezervacija);
  }
}
