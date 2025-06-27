import {AfterViewInit, Component, ViewChild, HostListener, viewChild, ElementRef} from '@angular/core';
import {AuthModalComponent} from "../../modals/auth-modal/auth-modal.component";
import {AuthService} from "../../services/auth.service";
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


interface TokenPayload{
  sub: string;
  userId: number;
  typeId: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})

export class AppComponent implements AfterViewInit {
  title = 'rekreacija';

  @ViewChild(AuthModalComponent, { static: false}) authModal!: AuthModalComponent;
  @ViewChild('chatbotButton') chatbotButton!: ElementRef;
  @ViewChild('chatbotBox') chatbotBox!: ElementRef;

  
  isChatbotVisible = false;
  userInput: string = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];
  token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : localStorage.getItem("token");
  username: string = 'Vi';

  constructor(private authService: AuthService, private http: HttpClient) {

    if(this.token){
      const decode: any = jwtDecode<TokenPayload>(this.token);
      this.username = decode.sub;
    }
  }

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
    'http://localhost:8080/api/chat',
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
