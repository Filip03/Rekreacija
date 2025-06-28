import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  userId: number;
  typeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenSubject = new BehaviorSubject<TokenPayload | null>(this.decodeToken());
  tokenChange$ = this.tokenSubject.asObservable();

  private decodeToken(): TokenPayload | null {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      return jwtDecode<TokenPayload>(token);
    }
    return null;
  }

  checkToken(): TokenPayload | null {
    return this.decodeToken();
  }

  updateToken(): void {
    const decoded = this.decodeToken();
    this.tokenSubject.next(decoded);
  }

  logout(): void {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    this.tokenSubject.next(null);
  }
}
