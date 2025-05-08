import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {resolve} from "@angular/compiler-cli";
declare var bootstrap: any;

@Component({
  selector: 'app-auth-modal',
  imports: [],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
  standalone: true
})
export class AuthModalComponent  implements AfterViewInit {

  @ViewChild('modal', { static: true }) modalElement!: ElementRef;
  private modalInstance: any;
  private resolveFn!: (value:boolean) => void;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  openModal(resolve: (result: boolean) => void) {
    this.resolveFn = resolve;
    this.modalInstance?.show();
  }

  closeModal(result: boolean) {
    this.modalInstance?.hide();
    if(this.resolveFn) {
      this.resolveFn(result);
    }
  }

  onConfirm() {
    this.closeModal(true);
  }

  onCancel() {
    this.closeModal(false);
  }
}
