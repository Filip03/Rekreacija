import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ngAfterViewInit(): void {
    const ctaButton = document.getElementById("ctaButton");
    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {
      if (!ctaButton || !hero) return;

      const heroBottom = hero.getBoundingClientRect().bottom;

      if (heroBottom <= 100) {
        ctaButton.classList.add("sticky");
      } else {
        ctaButton.classList.remove("sticky");
      }
    });
  }
}
