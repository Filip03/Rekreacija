import { Component, OnInit } from '@angular/core';

interface Obavjestenje {
  message: string;
}

@Component({
  selector: 'app-obavjestenja',
  templateUrl: './obavjestenja.component.html',
  styleUrl: './obavjestenja.component.scss',
  standalone: false
})
export class ObavjestenjaComponent implements OnInit {
  obavjestenja: Obavjestenje[] = [
    { message: 'Nova poruka od korisnika A.' },
    { message: 'Vaš nalog je ažuriran.' },
    { message: 'Podsetnik: Sastanak u 15h.' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
