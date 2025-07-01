import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerenService {
  private apiUrl = `${environment.API_URL}/api/teren`;

  constructor() { }
}
