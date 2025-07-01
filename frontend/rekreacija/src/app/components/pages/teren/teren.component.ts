import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TerenService } from 'src/app/services/teren.service';
//import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { Teren } from 'src/app/models/teren.model';

const customIcon = L.icon({
  iconUrl: 'assets/location-icon.png', // Putanja do tvoje slike ikone
  iconSize: [25, 30], // Veličina ikone u pikselima
  iconAnchor: [12, 41], // Tačka ikone koja odgovara lokaciji markera
  popupAnchor: [1, -34], // Tačka na kojoj će se pojaviti popup u odnosu na ikonu
  // shadowUrl: 'assets/images/marker-shadow.png', // Putanja do senke ikone (opciono)
  // shadowSize: [41, 41],
  // shadowAnchor: [12, 41]
});

interface Balon {
  name: string;
  coordinatesX: number;
  coordinatesY: number;
  imageUrl: string;
  linkUrl2: string;
  linkText2: string;
}

@Component({
  selector: 'app-teren',
  templateUrl: './teren.component.html',
  styleUrl: './teren.component.scss',
  standalone: false
})
export class TerenComponent implements OnInit {
  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [42.4304, 19.2594]; // Koordinate Podgorice
  public selectedTeren: Teren | null = null;
  public openInfo: Boolean = false;
  public tereni: Teren[] = [];

  constructor(private terenService: TerenService) { }

  ngOnInit(): void {
    this.terenService.getTereni().subscribe((data) => {
      this.tereni = data;
      this.initMap();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    // Kreiranje markera za svaki teren
    this.tereni.forEach(place => {
      const popupContent = `
        <b>${place.name}</b><br>
        <img src="${place.img_url}" alt="${place.name}" style="width:200px;max-width:200px;"><br>
        <a href="/teren" class="info-link">Vise o balonu</a>
        <span style="float: right;"><a href="/teren" target="_blank">Zakazi termin</a></span>
      `;
      const xCoord = Number(place.coordinates_x);
      const yCoord = Number(place.coordinates_y);
      const marker = L.marker([xCoord,yCoord])
        .bindPopup(popupContent)
        .addTo(this.map!);
      
        marker.on('popupopen', () => {
          const link: HTMLElement | null = document.querySelector('.info-link');
          if (link) {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              this.openInfo = !this.openInfo
              this.showSidebar(place);
            });
          }
        });
    })
  }

  public showSidebar(teren: Teren) {
    this.selectedTeren = teren;
  }

  public closeSidebar() {
    this.openInfo = false;
    this.selectedTeren = null;
  }

}
