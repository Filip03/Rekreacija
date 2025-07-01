import { Component } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  user_id: number = 0;
  showAddOwnerNotification: boolean = false;
  showAddAdminNotification: boolean = false;
  showAdminForm: boolean = false;
  showOwnerForm: boolean = false;
  adminNotifications: any = [];
  ownerNotifications: any = [];
  pitches: any = [];
  notification: any = {
    user_id: 0,
    pitch_id: 0,
    title: '',
    description: '',
    type: 0,
    date: new Date(),
  }
  pitchNames: { [id: number]: string } = {};

  constructor(private notificationsService: NotificationsService, private tokenService: TokenService) { }

  ngOnInit() {
    const token = this.tokenService.checkToken();
    if(token?.typeId === 2) {
      this.showAddOwnerNotification = true;
      this.user_id = token.userId;
      this.notification.type = 2;
      this.notification.user_id = token.userId;
    } else if(token?.typeId === 3) {
      this.showAddAdminNotification = true;
      this.user_id = token.userId;
      this.notification.type = 3;
      this.notification.user_id = token.userId;
    }
    this.notificationsService.getNotifications().subscribe((data) => {
      this.adminNotifications = (data as any[])
      .filter((notification: any) => notification.type === 3)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.ownerNotifications = (data as any[])
      .filter((notification: any) => notification.type === 2)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    this.notificationsService.getAllPitches().subscribe((pitches) => {
      for (const pitch of (pitches as any[])) {
        this.pitchNames[pitch.id] = pitch.name;
      }
      this.pitches = (pitches as any[]);
    });
  }

  refreshNotifications() {
    this.notificationsService.getNotifications().subscribe((data) => {
      this.adminNotifications = (data as any[])
      .filter((notification: any) => notification.type === 3)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.ownerNotifications = (data as any[])
      .filter((notification: any) => notification.type === 2)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  getOwnerPitchIds(): number[] {
    return this.pitches.filter((pitch: any) => pitch.owner_id === this.tokenService.checkToken()?.userId).map((pitch: any) => pitch.id);
  }

  addNotification() {
    this.notificationsService.addNotification(this.notification).subscribe((data) => {
      if (this.showAdminForm) {
        this.refreshNotifications();
        this.showAdminForm = false;
      }
      if (this.showOwnerForm) {
        this.refreshNotifications();
        this.showOwnerForm = false;
      }
      this.notification.title = '';
      this.notification.description = '';
    });
  }

  deleteNotification(id: number) {
    this.notificationsService.deleteNotification(id).subscribe((data) => {
      this.refreshNotifications();
    });
  }
}
