import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  modalCallback: ((resolve: (result: boolean) => void) => void) | null = null;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

  triggerModalIfNeeded(): Promise<boolean>{
    return new Promise(resolve => {
      if(this.modalCallback){
        this.modalCallback(resolve);
      }else{
        resolve(false);
      }
    });
  }
}
