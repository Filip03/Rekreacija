import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  adminData: any = null;
  users: any = [];
  owners: any = [];
  pitches: any = [];
  showUsers: boolean = false;
  showPitches: boolean = false;
  showAddPitch: boolean = false;
  editingPitchId: number | null = null; 
  editPitchData: any = {};
  newPitchData: any = {
    name: '',
    adress: '',
    contact: '',
    type: 1,
    description: '',
    rating: 0.0,
    owner_id: null,
    cordinates_x: 0.0,
    cordinates_y: 0.0,
    area: '',
  }; 

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getUserById(Number(id)).subscribe({
      next: (user) => {
        console.log('User data:', user);
        this.adminData = user;
      }, error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
    this.adminService.getAllUsers().subscribe(
      (users: any) => {
        console.log('Users:', users);
        this.users = users;
        this.owners = users.filter((user: any) => user.type_id === 2);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
    this.adminService.getAllPitches().subscribe({
      next: (pitches) => {
        console.log('Pitches:', pitches);
        this.pitches = pitches;
      }, error: (error) => {
        console.error('Error fetching pitches:', error);
      }
    });
  }

  showUsersBox() {
    this.showUsers = !this.showUsers;
    this.showPitches = false;
  }

  showPitchesBox() {
    this.showPitches = !this.showPitches;
    this.showUsers = false; 
  }

  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.users = this.users.filter((user: any) => user.id !== userId);
      }, error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  promoteUserAdmin(userId: number) {
    this.adminService.promoteUserAdmin(userId, 3).subscribe({
      next: () => {
        console.log('User promoted to admin successfully');
        const user = this.users.find((user: any) => user.id === userId);
        if (user) {
          user.type = 3;
        }
      }, error: (error) => {
        console.error('Error promoting user to admin:', error);
      }
    });
  }

  promoteUserOwner(userId: number) {
    this.adminService.promoteUserOwner(userId, 2).subscribe({
      next: () => {
        console.log('User promoted to owner successfully');
        const user = this.users.find((user: any) => user.id === userId);
        if (user) {
          user.type = 2;
        }
      }, error: (error) => {
        console.error('Error promoting user to owner:', error);
      }
    });
  }

  getPitchTypeString(type: number): string {
    switch(type) {
      case 1: return 'Fudbalski teren';
      case 2: return 'Košarkaški teren';
      case 3: return 'Teniski teren';
      default: return 'Nepoznati tip terena';
    }
  }

  editPitch(pitchId: number) {
    this.editingPitchId = pitchId;
    const pitch = this.pitches.find((p: any) => p.id === pitchId);
    if (pitch) {
      this.editPitchData = { ...pitch };
    }
  }

  cancelEdit() {
    this.editingPitchId = null;
    this.editPitchData = {};
  }

  saveEditPitch() {
    if (this.editingPitchId && this.editPitchData) {
      this.adminService.updatePitch(this.editingPitchId, this.editPitchData).subscribe({
        next: (updatedPitch) => {
          console.log('Pitch updated successfully');
          const index = this.pitches.findIndex((p: any) => p.id === this.editingPitchId);
          if (index !== -1) {
            this.pitches[index] = updatedPitch;
          }
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating pitch:', error);
        }
      });
    }
  }

  addPitch() {
    this.adminService.insertPitch(this.newPitchData).subscribe({
      next: (newPitch) => {
        console.log('Pitch added successfully');
        this.pitches.push(newPitch);
        this.newPitchData = {};
      }, error: (error) => {
        console.error('Error adding pitch:', error);
      }
    });
  }

  cancelInsert(){
    this.newPitchData = {
    name: '',
    adress: '',
    contact: '',
    type: 1,
    description: '',
    rating: 0.0,
    owner_id: null,
    cordinates_x: 0.0,
    cordinates_y: 0.0,
    area: '',
  }; 
  }

  deletePitch(pitchId: number) {
    this.adminService.deletePitch(pitchId).subscribe({
      next: () => {
        console.log('Pitch deleted successfully');
        this.pitches = this.pitches.filter((pitch: any) => pitch.id !== pitchId);
      }, error: (error) => {
        console.error('Error deleting pitch:', error);
      }
    });
  }
}
