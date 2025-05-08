import {AfterViewInit, Component, ViewChild} from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
      this.authService.modalCallback = (resolve: (result:boolean) => void) => {
        this.authModal.openModal(resolve);
      };
  };
}
