import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { end } from '@popperjs/core';
import { Rezervacija } from 'src/app/models/rezervacija';
import { Teren } from 'src/app/models/teren.model';
import { AdminService } from 'src/app/services/admin.service';
import { RezervacijaService } from 'src/app/services/rezervacija.service';
import { TerenService } from 'src/app/services/teren.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrl: './rezervacija.component.scss',
  standalone: false
})
export class RezervacijaComponent implements OnInit {
  terenId: number | null = null;
  public pickedDate: any = undefined;
  public startTime: string = "";
  public endTime: string = "";
  public teren : Teren | null = null;
  public owner: any = null;
  public uid: number | undefined = undefined;
  public user: any = null;
  public zauzet: boolean = false;

  public rating: number = 0; // Trenutni rejting
  public hoverRating: number = 0;
  public stars: number[] = [1, 2, 3, 4, 5];
  public ratingChosen: boolean = false;

  constructor(private route: ActivatedRoute, 
              private terenService: TerenService, 
              private adminService: AdminService,
              private tokenService: TokenService,
              private rezervacijaService: RezervacijaService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.terenId = idParam ? +idParam : null;
      
      this.terenService.getTerenById(this.terenId!).subscribe((data) => {
        this.teren = data;
        this.setBackground(this.teren.type);
        this.rating = this.teren.rating;
        
        this.adminService.getUserById(this.teren!.owner_id).subscribe((data) => {
          this.owner = data;
        });
      });
    });

    this.uid = this.tokenService.checkToken()?.userId;
    this.adminService.getUserById(this.uid!).subscribe((data) => {
      this.user = data;
    });
  }

  formatDateTime(date: {year: number, month: number, day: number}, time: string): string {
    // Pad month i day na 2 cifre
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    // Time je već HH:mm
    return `${date.year}-${month}-${day}T${time}:00`;
  }

  rezervisi() {
    // Validation: Check if all fields are selected
    if (!this.pickedDate || this.startTime === "" || this.endTime === "") {
      alert('Molimo izaberite datum i oba vremena.');
      return;
    }

    // Validation: Check if end time is after start time
    if (this.startTime >= this.endTime) {
      alert('Završno vrijeme mora biti nakon početnog vremena.');
      return;
    }

    const formatedStartDate = this.formatDateTime(this.pickedDate, this.startTime);
    const formatedEndDate = this.formatDateTime(this.pickedDate, this.endTime);
    const newReservation: Rezervacija = {
      status: "zauzeto",
      // start_date: `${this.pickedDate}T${this.startTime}`,
      start_date: formatedStartDate,
      end_date: formatedEndDate,
      // end_date: `${this.pickedDate}T${this.endTime}`,
      user_id: this.user.id,
      pitch_id: this.teren!.id
    };

    console.log(this.pickedDate);
    console.log(this.startTime);
    console.log(this.endTime);

    this.rezervacijaService.insertRezervacija(newReservation).subscribe({
      next: response => {
        this.pickedDate = undefined;
        this.startTime = '';
        this.endTime = '';
        this.zauzet = false;
        alert('Termin uspjesno zakazan.');
      },
      error: err => {
        if(err.status == 403){
          this.zauzet = true;
          alert('Termin već zauzet, molimo izaberite drugi.')
        }
        console.log(err);
      }
    });
  }

  private setBackground(sportType: number): void {
    const reservationDiv = document.getElementById('reservation-div')    

    if(reservationDiv){
      reservationDiv.classList.remove('football', 'basketball', 'tennis');

      switch(sportType){
        case 1:
          reservationDiv?.classList.add('football');
          break;
        case 2:
          reservationDiv?.classList.add('basketball');
          break;
        case 3:
          reservationDiv?.classList.add('tennis');
          break;
        default:
          console.warn("Nije poznat tip sporta, ne dodaje se slikana pozadinu");
          break;
      }
    }else{
      console.error('nema elementa sa id: reservation-div');
    }
  }

  setRating(value: number) {
    if(this.ratingChosen){
      return;
    }
    this.rating = value;
    this.ratingChosen = true;
  }
  getStarFill(index: number): string {
    const effectiveRating = this.hoverRating || this.rating;
    if (effectiveRating >= index + 1) {
      return '110%';
    }
    if (effectiveRating > index) {
      const partial = (effectiveRating - index) * 100;
      return `${partial}%`;
    }
    return '0%';
  }
}
