import { Token } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {

  showAdminIcon: boolean = false;
  private tokenSub!: Subscription;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenSub = this.tokenService.tokenChange$.subscribe(token => {
      this.showAdminIcon = !!token && token.typeId === 3;
    });
  }

  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/']);
  }

  goToNotifications(){
    this.router.navigate(["/notifications"]);
  }

  goToAdminPanel(): void{
    this.router.navigate(["/admin"]);
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }
}
