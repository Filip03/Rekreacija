import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ObavjestenjaService {
  private apiUrl = `${environment.API_URL}/api/obavjestenje`

  constructor() { }
}
