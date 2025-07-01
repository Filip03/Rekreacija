import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiUrl = `${environment.API_URL}/api/obavjestenje`;

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get(`${this.apiUrl}`);
  }

  addNotification(notification: any) {
    return this.http.post(`${this.apiUrl}`, notification);
  }

  deleteNotification(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPitchById(id: number) {
    return this.http.get(`${environment.API_URL}/api/teren/${id}`);
  }

  getAllPitches() {
    return this.http.get(`${environment.API_URL}/api/teren`);
  }
}
