import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {interval, Subscription} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-about',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slides = [
    { src: 'assets/kosarka_termin.jpg', alt: 'Rezervacije', title: 'Rezervacije', description: 'Rezervišite teren za omiljeni sport u samo par klikova.' },
    { src: 'assets/termin.png', alt: 'Timovi', title: 'Kreirajte timove', description: 'Povežite se sa prijateljima i organizujte zajedničke termine.' },
    { src: 'assets/telefon.png', alt: 'Statistika', title: 'Budite u koraku sa svim novostima', description: 'Tabla obavještenja je tu da Vam ništa ne bi promaklo.' }
  ];
  private autoSlideSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.showSlide(this.currentSlide);
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  showSlide(index: number): void {
    this.currentSlide = index;
  }

  changeSlide(direction: number): void {
    this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  startAutoSlide(): void {
    this.autoSlideSubscription = interval(5000).subscribe(() => {
      this.changeSlide(1);
    });
  }

  stopAutoSlide(): void {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
