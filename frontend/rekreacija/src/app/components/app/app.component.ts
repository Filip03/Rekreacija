import {AfterViewInit, Component, ViewChild, HostListener, viewChild, ElementRef} from '@angular/core';
import {AuthModalComponent} from "../../modals/auth-modal/auth-modal.component";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements AfterViewInit {
  title = 'rekreacija';

  @ViewChild(AuthModalComponent, { static: false}) authModal!: AuthModalComponent;
  @ViewChild('chatbotIframe') chatbotIframe!: ElementRef;
  @ViewChild('chatbotButton') chatbotButton!: ElementRef;

  isChatbotVisible = false;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
      this.authService.modalCallback = (resolve: (result:boolean) => void) => {
        this.authModal.openModal(resolve);
      };
  };

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideIframe = this.chatbotIframe?.nativeElement.contains(event.target);
    const clickedOnButton = this.chatbotButton?.nativeElement.contains(event.target);

    if(this.isChatbotVisible && !clickedInsideIframe && !clickedOnButton) {
      this.isChatbotVisible = false;
    }
  }
}
