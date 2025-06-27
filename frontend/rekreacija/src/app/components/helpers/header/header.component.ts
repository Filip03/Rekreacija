import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {

    showNotifications: boolean = false;

    constructor(private router: Router) {}

    toggleNotifications(){
        this.showNotifications = !this.showNotifications;
        console.log(this.showNotifications);
    }

    logout(): void{
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.router.navigate(['/']);

    }

}
