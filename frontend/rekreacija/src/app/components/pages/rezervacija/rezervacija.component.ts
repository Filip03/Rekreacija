import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teren } from 'src/app/models/teren.model';
import { TerenService } from 'src/app/services/teren.service';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrl: './rezervacija.component.scss',
  standalone: false
})
export class RezervacijaComponent implements OnInit {
  terenId: number | null = null;
  public pickedDate: Date | null = null;
  public startTime: string | null = null;
  public endTime: string | null = null;
  public teren : Teren | null = null;

  constructor(private route: ActivatedRoute, private terenService: TerenService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        this.terenId = idParam ? +idParam : null;
        console.log("primljen id: ", this.terenId);
        
        this.terenService.getTerenById(this.terenId!).subscribe((data) => {
          this.teren = data;
          console.log(this.teren);
          this.setBackground(this.teren.type);
        });
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

  
}
