import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private ekipaApiUrl = `${environment.API_URL}/api/ekipa`;
  private korisnikApiUrl = `${environment.API_URL}/api/korisnik`;

  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<any> {
    return this.http.get(this.ekipaApiUrl);
  }

  getTeamById(team_id: number): Observable<any> {
    return this.http.get(`${this.ekipaApiUrl}/${team_id}`);
  }

  createTeam(teamData: any): Observable<any> {
    return this.http.post(this.ekipaApiUrl, teamData);
  }

  updateTeam(team_id: number, data: any): Observable<any> {
    return this.http.put(`${this.ekipaApiUrl}/${team_id}`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.korisnikApiUrl);
  }

  getUserById(user_id: number): Observable<any> {
    return this.http.get(`${this.korisnikApiUrl}/${user_id}`);
  }

  updateUser(user_id: number, userData: any): Observable<any> {
    return this.http.put(`${this.korisnikApiUrl}/${user_id}`, userData);
  }
}
