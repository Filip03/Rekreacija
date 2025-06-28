import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.API_URL}/api/korisnik`;

  constructor( private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  promoteUserAdmin(id: number, type: number) {
    return this.http.put(`${this.apiUrl}/admin-promote/${id}`, type);
  }

  promoteUserOwner(id: number, type: number) {
    return this.http.put(`${this.apiUrl}/owner-promote/${id}`, type);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllPitches() {
    return this.http.get(`${environment.API_URL}/api/teren`);
  }

  insertPitch(pitchData: any) {
    return this.http.post(`${environment.API_URL}/api/teren`, pitchData);
  }

  updatePitch(id: number, pitchData: any) {
    return this.http.put(`${environment.API_URL}/api/teren/${id}`, pitchData);
  }

  deletePitch(id: number) {
    return this.http.delete(`${environment.API_URL}/api/teren/${id}`);
  }
}
