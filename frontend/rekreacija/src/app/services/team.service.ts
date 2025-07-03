import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Ekipa } from '../models/ekipa';
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class EkipaService {
  private ekipaApiUrl = `${environment.API_URL}/api/ekipa`;
  private korisnikApiUrl = `${environment.API_URL}/api/korisnik`;
  private rezervacijaApiUrl = `${environment.API_URL}/api/rezerviacija`;

  constructor(private http: HttpClient) { }

  getSveEkipe(): Observable<Ekipa[]> {
    return this.http.get<Ekipa[]>(this.ekipaApiUrl);
  }

  getEkipaById(id: number): Observable<Ekipa> {
    return this.http.get<Ekipa>(`${this.ekipaApiUrl}/${id}`);
  }

  kreirajEkipu(ekipaData: { name: string, creator_id: number, rating: number }): Observable<any> {
    return this.http.post(this.ekipaApiUrl, ekipaData);
  }

  updateEkipa(id: number, ekipaData: Ekipa): Observable<any> {
    return this.http.put(`${this.ekipaApiUrl}/${id}`, ekipaData);
  }

  getSveKorisnike(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.korisnikApiUrl);
  }
  
  getKorisnikById(id: number): Observable<Korisnik> {
    return this.http.get<Korisnik>(`${this.korisnikApiUrl}/${id}`);
  }

  updateKorisnik(id: number, korisnikData: Korisnik): Observable<any> {
    return this.http.put(`${this.korisnikApiUrl}/${id}`, korisnikData);
  }

  getRezervacijeZaKorisnika(userId: number): Observable<Rezervacija[]> {
    return this.http.get<Rezervacija[]>(`${this.rezervacijaApiUrl}/user_id/${userId}`);
  }

  /**
   * Dobavlja sve potrebne podatke za prikaz stranice jedne ekipe.
   */
  getPodaciZaEkipu(ekipaId: number): Observable<{ ekipa: Ekipa, termini: Rezervacija[] }> {
    return this.getEkipaById(ekipaId).pipe(
      switchMap(ekipa => {
        // Kada dobijemo ekipu, paralelno dobavljamo njene članove i termine
        const clanovi$ = this.getClanoveEkipe(ekipa.id);
        const termini$ = this.getRezervacijeZaKorisnika(ekipa.creator_id);

        return forkJoin({ clanovi: clanovi$, termini: termini$ }).pipe(
          map(result => {
            ekipa.clanovi = result.clanovi; // Dodajemo članove u objekat ekipe
            return { ekipa: ekipa, termini: result.termini };
          })
        );
      })
    );
  }

// Dobavlja sve korisnike i na frontendu filtrira one koji pripadaju određenoj ekipi.
  getClanoveEkipe(ekipaId: number): Observable<Korisnik[]> {
    return this.getSveKorisnike().pipe(
      map(korisnici => korisnici.filter(k => k.team_id === ekipaId))
    );
  }

//Dobavlja sve korisnike i na frontendu filtrira one koji NEMAJU tim.
  getSlobodneKorisnike(): Observable<Korisnik[]> {
      return this.getSveKorisnike().pipe(
          map(korisnici => korisnici.filter(k => k.team_id === null || k.team_id === 0))
      );
  }

  kreirajEkipuSaClanovima(request: { name: string, creator_id: number, clanoviIds: number[] }): Observable<Ekipa> {
    return this.http.post<Ekipa>(`${this.ekipaApiUrl}/sveobuhvatno`, request);
  }
}