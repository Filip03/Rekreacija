import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { TerenService } from 'src/app/services/teren.service';
//import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { Teren } from 'src/app/models/teren.model';

// Create sport-specific colored icons using default marker style
const footballIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const basketballIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const tennisIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
  standalone: false,
  encapsulation: ViewEncapsulation.None
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
      // console.log('Received terrain data:', data);
      this.tereni = data;
      // console.log('Number of terrains:', this.tereni.length);
      this.initMap();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    // Kreiranje markera za svaki teren
    this.tereni.forEach(place => {
      // console.log('Creating marker for:', place.name, 'Type:', place.type, 'Coordinates:', place.coordinates_x, place.coordinates_y);
      
      const popupContent = `
        <b>${place.name}</b><br>
        <img src="${place.img_url}" alt="${place.name}" style="width:200px;max-width:200px;"><br>
        <div style="margin-top: 10px; display: flex; gap: 8px; justify-content: space-between;">
          <button class="info-link popup-btn info-btn">Više o terenu</button>
          <button onclick="window.open('/termin', '_blank')" class="popup-btn schedule-btn">Zakaži termin</button>
        </div>
      `;
      const xCoord = Number(place.coordinates_x);
      const yCoord = Number(place.coordinates_y);
      
      // console.log('Parsed coordinates:', xCoord, yCoord);
      
      // Check if coordinates are valid
      if (isNaN(xCoord) || isNaN(yCoord)) {
        console.error('Invalid coordinates for', place.name, '- skipping marker');
        return;
      }
      
      // Select appropriate icon based on sport type
      let markerIcon;
      switch(place.type) {
        case 1: // Football
          markerIcon = footballIcon;
          break;
        case 2: // Basketball
          markerIcon = basketballIcon;
          break;
        case 3: // Tennis
          markerIcon = tennisIcon;
          break;
        default:
          markerIcon = footballIcon; // Default to football
      }
      
      // console.log('Creating marker with icon for type:', place.type);
      
      const marker = L.marker([xCoord, yCoord], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(this.map!);
      
      // console.log('Marker created successfully for:', place.name);
      
        marker.on('popupopen', () => {
          const link: HTMLElement | null = document.querySelector('.info-link');
          if (link) {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              this.openInfo = true;
              this.showSidebar(place);
              // Close the popup after opening sidebar
              marker.closePopup();
              
            });
          }
        });
    })
  }

  public showSidebar(teren: Teren) {
    this.selectedTeren = teren;

    setTimeout(() => {
      const sidebar = document.querySelector('.info-sidebar');
      if (sidebar) {
        sidebar.addEventListener('wheel', (e) => {
          e.stopPropagation();
        });
      }
    }, 0);
  }

  public closeSidebar() {
    this.openInfo = false;
    this.selectedTeren = null;
  }

  public zakaziTermin() {
    window.open('/termin', '_blank');
  }

}
