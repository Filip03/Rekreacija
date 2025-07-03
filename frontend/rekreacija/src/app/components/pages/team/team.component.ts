import { Component, OnInit } from '@angular/core';
import { EkipaService } from 'src/app/services/team.service';
import { Ekipa } from 'src/app/models/ekipa';
import { Korisnik } from 'src/app/models/korisnik';
import { Rezervacija } from 'src/app/models/rezervacija';
import { finalize, forkJoin, switchMap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  selector: 'app-tim',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ulogovaniKorisnik: Korisnik | null = null;
  ekipa: Ekipa | null = null;
  sveEkipe: Ekipa[] = [];
  terminiEkipe: { odigrani: Rezervacija[], zakazani: Rezervacija[] } = { odigrani: [], zakazani: [] };
  
  isLoading = true;
  isEditingName = false;
  isAddingMembers = false;
  isCreatingTeam = false;

  noviNazivEkipe = '';
  slobodniKorisnici: Korisnik[] = [];
  selektovaniKorisniciZaDodavanje: number[] = [];

  constructor(
    private ekipaService: EkipaService,
    private router: Router
  ) { }


// 1. Dohvata JWT token iz local/session storage
// 2. Dekodira token da bi izvukao ID korisnika
// 3. Na osnovu ID-ja korisnika, poziva backend da dohvati detalje korisnika
// 4. Ako korisnik pripada timu, učitava se i tim; u suprotnom lista svih timova

ngOnInit(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        this.router.navigate(['/']);
        return;
    }

    try {
        // Znak uzvika (!) na kraju 'token!' govori TypeScriptu:
        // "Veruj mi, u ovom trenutku token sigurno nije null."
        const dekodiraniPodaci: any = jwtDecode(token!);
        const userId = dekodiraniPodaci.userId;

        if (!userId) {
            throw new Error('userId nije pronađen u tokenu!');
        }

        this.isLoading = true;
        this.ekipaService.getKorisnikById(userId).pipe(
            finalize(() => {
                this.isLoading = false;
            }),
            catchError(error => {
                console.error("Greška pri dobijanju podataka o korisniku sa servera:", error);
                this.router.navigate(['/']); 
                return of(null);
            })
        ).subscribe(korisnik => {
            if (korisnik) {
                this.ulogovaniKorisnik = korisnik;

                if (korisnik.team_id) {
                    this.ucitajPodatkeEkipe(korisnik.team_id);
                } else {
                    this.ucitajSveEkipe();
                }
            }
        });

    } catch (error) {
        console.error("Greška pri dekodiranju tokena:", error);
        this.router.navigate(['/login']);
    }
}

  
  ucitajUlogovanogKorisnika(): void {
    const korisnikData = localStorage.getItem('ulogovaniKorisnik');
    if (korisnikData) {
      this.ulogovaniKorisnik = JSON.parse(korisnikData);
    }
  }

  ucitajPodatkeEkipe(ekipaId: number): void {
    this.isLoading = true;
    this.ekipaService.getPodaciZaEkipu(ekipaId).pipe(
      finalize(() => this.isLoading = false),
      catchError(error => {
        console.error('Greška pri učitavanju podataka ekipe:', error);
        alert('Došlo je do greške. Moguće je da ekipa više ne postoji.');
        this.resetToNoTeamView();
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.ekipa = data.ekipa;
        this.noviNazivEkipe = data.ekipa.name;
        
        const sada = new Date();
        // Razdvaja termine na odigrane (u prošlosti) i zakazane (u budućnosti)
        this.terminiEkipe.odigrani = data.termini.filter(t => new Date(t.start_date) < sada);
        this.terminiEkipe.zakazani = data.termini.filter(t => new Date(t.start_date) >= sada);
      }
    });
  }

  ucitajSveEkipe(): void {
    this.isLoading = true;
    forkJoin({
      ekipe: this.ekipaService.getSveEkipe(),
      korisnici: this.ekipaService.getSveKorisnike()
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(({ ekipe, korisnici }) => {
      this.sveEkipe = ekipe.map(ekipa => ({
        ...ekipa,
        clanovi: korisnici.filter(k => k.team_id === ekipa.id)
      }));
    });
  }

//Logika za kreatora

// Proverava da li je trenutni korisnik kreator tima
  get jeKreator(): boolean {
    return !!(this.ekipa && this.ulogovaniKorisnik && this.ekipa.creator_id === this.ulogovaniKorisnik.id);
  }

 // Ažurira naziv ekipe na backendu i osvežava prikazani naziv
  onSacuvajIzmeneNaziva(): void {
    if (!this.ekipa || this.noviNazivEkipe.trim() === '') return;
    const azuriranaEkipaData = { ...this.ekipa, name: this.noviNazivEkipe.trim() };
    this.ekipaService.updateEkipa(this.ekipa.id, azuriranaEkipaData).subscribe(() => {
      this.ekipa!.name = this.noviNazivEkipe.trim();
      this.isEditingName = false;
      alert('Naziv ekipe je uspešno promenjen.');
    });
  }

  onUkloniClana(clan: Korisnik): void {
    if (confirm(`Da li ste sigurni da želite da uklonite člana ${clan.name} ${clan.surname}?`)) {
      const azuriraniClan = { ...clan, team_id: null };
      this.ekipaService.updateKorisnik(clan.id, azuriraniClan).subscribe(() => {
        alert('Član je uspešno uklonjen.');
        this.ucitajPodatkeEkipe(this.ekipa!.id);
      });
    }
  }

//Logika za sve clanove
  onNapustiTim(): void {
    if (confirm('Da li ste sigurni da želite da napustite ekipu?')) {
      const azuriraniKorisnik = { ...this.ulogovaniKorisnik!, team_id: null };
      this.ekipaService.updateKorisnik(this.ulogovaniKorisnik!.id, azuriraniKorisnik).subscribe(() => {
        alert('Uspešno ste napustili ekipu.');
        this.azurirajKorisnikaULocalStorage({ team_id: null });
        this.resetToNoTeamView();
      });
    }
  }

  //Logika za dodavanje i kreiranje

  pokreniDodavanjeClanova(): void {
    this.isAddingMembers = true;
    this.ekipaService.getSlobodneKorisnike().subscribe(korisnici => {
      this.slobodniKorisnici = korisnici;
    });
  }

  onDodajClanove(): void {
    if (!this.ekipa || this.selektovaniKorisniciZaDodavanje.length === 0) return;

    const getKorisniciObservables = this.selektovaniKorisniciZaDodavanje.map(id => this.ekipaService.getKorisnikById(id));
    
    forkJoin(getKorisniciObservables).pipe(
      switchMap(korisniciZaDodavanje => {
        const updateObservables = korisniciZaDodavanje.map(korisnik => {
          const azuriraniKorisnik = { ...korisnik, team_id: this.ekipa!.id };
          return this.ekipaService.updateKorisnik(korisnik.id, azuriraniKorisnik);
        });
        return forkJoin(updateObservables);
      })
    ).subscribe(() => {
        alert('Članovi su uspešno dodati.');
        this.isAddingMembers = false;
        this.selektovaniKorisniciZaDodavanje = [];
        this.ucitajPodatkeEkipe(this.ekipa!.id);
    });
  }

  pokreniKreiranjeTima(): void {
    this.isCreatingTeam = true;
    this.noviNazivEkipe = '';
    this.selektovaniKorisniciZaDodavanje = [];
    this.ekipaService.getSlobodneKorisnike().subscribe(korisnici => {
      this.slobodniKorisnici = korisnici.filter(k => k.id !== this.ulogovaniKorisnik!.id);
    });
  }


onKreirajTim(): void {
  if (this.noviNazivEkipe.trim() === '' || !this.ulogovaniKorisnik) {
    alert('Naziv ekipe ne može biti prazan.');
    return;
  }

  const clanoviZaDodavanje = [...this.selektovaniKorisniciZaDodavanje, this.ulogovaniKorisnik.id];
  const jedinstveniClanoviIds = [...new Set(clanoviZaDodavanje)];

  const request = {
    name: this.noviNazivEkipe.trim(),
    creator_id: this.ulogovaniKorisnik.id,
    clanoviIds: jedinstveniClanoviIds
  };

  this.ekipaService.kreirajEkipuSaClanovima(request).subscribe({
    next: (kreiranaEkipa) => {
      alert(`Ekipa "${kreiranaEkipa.name}" je uspešno kreirana!`);
      window.location.reload();
    },
    error: (err) => {
      console.error("Greška pri kreiranju ekipe:", err);
      alert("Došlo je do greške prilikom kreiranja ekipe.");
    }
  });
}
  
  //Pomoćne funkcije

  azurirajKorisnikaULocalStorage(promene: Partial<Korisnik>): void {
    const svezKorisnik = { ...this.ulogovaniKorisnik, ...promene };
    localStorage.setItem('ulogovaniKorisnik', JSON.stringify(svezKorisnik));
    this.ulogovaniKorisnik = svezKorisnik as Korisnik;
  }

  resetToNoTeamView(): void {
      this.ekipa = null;
      this.ucitajSveEkipe();
  }

  toggleUserSelection(userId: number): void {
    const index = this.selektovaniKorisniciZaDodavanje.indexOf(userId);
    if (index > -1) {
      this.selektovaniKorisniciZaDodavanje.splice(index, 1);
    } else {
      this.selektovaniKorisniciZaDodavanje.push(userId);
    }
  }
}