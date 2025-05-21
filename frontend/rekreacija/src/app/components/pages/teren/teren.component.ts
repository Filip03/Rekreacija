import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TerenService } from 'src/app/services/teren.service';
//import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

const customIcon = L.icon({
  iconUrl: 'assets/location-icon.png', // Putanja do tvoje slike ikone
  iconSize: [25, 30], // Veličina ikone u pikselima
  iconAnchor: [12, 41], // Tačka ikone koja odgovara lokaciji markera
  popupAnchor: [1, -34], // Tačka na kojoj će se pojaviti popup u odnosu na ikonu
  // shadowUrl: 'assets/images/marker-shadow.png', // Putanja do senke ikone (opciono)
  // shadowSize: [41, 41],
  // shadowAnchor: [12, 41]
});

@Component({
  selector: 'app-teren',
  templateUrl: './teren.component.html',
  styleUrl: './teren.component.scss',
  standalone: false
})
export class TerenComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [42.4304, 19.2594]; // Koordinate Podgorice (primer)

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.initMap();
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

    // const sutjeska = L.marker([42.447610, 19.256017]).addTo(this.map);

    const baloni = [
      {
        name: 'Balon Gimnazije',
        coordinatesX: 42.447688,
        coordinatesY: 19.264295,
        imageUrl: 'assets/gimnazija.jpg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      },
      {
        name: 'Stampar Sports Centre',
        coordinatesX: 42.446253,
        coordinatesY: 19.242308,
        imageUrl: 'assets/stampar.jpg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      },
      {
        name: 'Balon za mali fudbal Bernabeu',
        coordinatesX: 42.425285,
        coordinatesY: 19.232699,
        imageUrl: 'assets/bernabeu.jpg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      },
      {
        name: 'Balon Tolosi',
        coordinatesX: 42.453766,
        coordinatesY: 19.215700,
        imageUrl: 'assets/tolosi.jpg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      },
      {
        name: 'Sportski Centar Dadex',
        coordinatesX: 42.443522,
        coordinatesY: 19.281300,
        imageUrl: 'assets/dadex.jpg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      },
      {
        name: 'Arena Sportski Centar',
        coordinatesX: 42.431683,
        coordinatesY: 19.257928,
        imageUrl: 'assets/arena.jpeg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      },
      {
        name: 'Balon za mali fudbal Sutjeska',
        coordinatesX: 42.447610,
        coordinatesY: 19.256017,
        imageUrl: 'assets/sutjeska.jpg',
        linkUrl1: 'http://localhost:4200',
        linkText1: 'Vise o balonu',
        linkUrl2: 'http://localhost:4200',
        linkText2: 'Zakazi termin'
      }
    ]

    baloni.forEach(place => {
      const popupContent = `
        <b>${place.name}</b><br>
        <img src="${place.imageUrl}" alt="${place.name}" style="width:200px;max-width:200px;"><br>
        <a href="${place.linkUrl1}" target="_blank">${place.linkText1}</a>
        <span style="float: right;"><a href="${place.linkUrl2}" target="_blank">${place.linkText2}</a></span>
      `;
      L.marker([place.coordinatesX,place.coordinatesY])
        .bindPopup(popupContent)
        .addTo(this.map!);
    })
  }


}
