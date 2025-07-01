import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Teren } from '../models/teren.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TerenService {
  private apiUrl = `${environment.API_URL}/api/teren`;

  constructor(private http: HttpClient) { }

  getTereni(): Observable<Teren[]> {
    return this.http.get<Teren[]>(this.apiUrl);
  }
}
