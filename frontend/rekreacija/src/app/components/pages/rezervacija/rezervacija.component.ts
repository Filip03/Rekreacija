import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrl: './rezervacija.component.scss',
  standalone: false
})
export class RezervacijaComponent implements OnInit {
  terenId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        this.terenId = idParam ? +idParam : null;
        console.log("primljen id: ", this.terenId);
      });
  }

}
