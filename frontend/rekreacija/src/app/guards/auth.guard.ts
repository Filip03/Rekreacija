import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('token');
  if(token){
    return true;
  }else{
    return new Promise<boolean>((resolve) => {
      const confirm = window.confirm('Morate biti ulogovani kako biste pristupili stranici');
      if(confirm){
        router.navigate(['/login']);
      }else{
        router.navigate(['/']);
      }
    })
  }
};
