import {AfterViewInit, Component, ViewChild, HostListener, viewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {AuthModalComponent} from "../../modals/auth-modal/auth-modal.component";
import {AuthService} from "../../services/auth.service";
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/app/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})

export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'rekreacija';

  @ViewChild(AuthModalComponent, { static: false }) authModal!: AuthModalComponent;
  @ViewChild('chatbotButton') chatbotButton!: ElementRef;
  @ViewChild('chatbotBox') chatbotBox!: ElementRef;

  isChatbotVisible = false;
  userInput: string = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];
  username: string = 'Vi';

  private tokenSub!: Subscription;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.tokenSub = this.tokenService.tokenChange$.subscribe(token => {
      this.username = token?.sub || 'Vi';
    });
  }

  ngAfterViewInit() {
    this.authService.modalCallback = (resolve: (result: boolean) => void) => {
      this.authModal.openModal(resolve);
    };
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedOnButton = this.chatbotButton?.nativeElement.contains(event.target);
    const clickedInsideChatbot = this.chatbotBox?.nativeElement.contains(event.target);

    if (this.isChatbotVisible && !clickedOnButton && !clickedInsideChatbot) {
      this.isChatbotVisible = false;
    }
  }

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ from: 'user', text: message });
    this.userInput = '';

    this.http.post<{ response: string }>(
      `${environment.API_URL}/api/chat`,
      { message }
    ).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res.response });
      },
      error: () => {
        this.messages.push({ from: 'bot', text: 'Došlo je do greške prilikom komunikacije.' });
      }
    });
  }
}
