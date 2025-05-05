import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerenService {
  private apiUrl = 'http://localhost:8080/teren';

  constructor() { }
}
