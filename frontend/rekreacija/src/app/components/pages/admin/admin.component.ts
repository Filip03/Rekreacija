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
    coordinates_x: '',
    coordinates_y: '',
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
      next: (pitches: any) => {
        console.log('Pitches from backend:', pitches);
        if (pitches && Array.isArray(pitches) && pitches.length > 0) {
          console.log('First pitch sample:', pitches[0]);
          console.log('First pitch property names:', Object.keys(pitches[0]));
          console.log('First pitch type value:', pitches[0].type);
          console.log('First pitch type typeof:', typeof pitches[0].type);
        }
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
          user.type_id = 3;
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
          user.type_id = 2;
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

  getUserTypeString(type_id: number): string {
    switch(type_id) {
      case 1: return 'Igrač';
      case 2: return 'Upravnik';
      case 3: return 'Admin';
      default: return 'Nepoznat tip korisnika';
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
      console.log('Data being sent to backend for update:', this.editPitchData);
      
      this.adminService.updatePitch(this.editingPitchId, this.editPitchData).subscribe({
        next: (result: any) => {
          console.log('Response from backend after update:', result);
          
          if (result === 1) {
            // Success: Update the pitch in our array with the edited data
            const index = this.pitches.findIndex((p: any) => p.id === this.editingPitchId);
            if (index !== -1) {
              this.pitches[index] = { ...this.editPitchData };
              console.log('Updated pitch with our data:', this.pitches[index]);
            }
            this.cancelEdit();
            console.log('Pitch updated successfully');
          } else {
            // Failure: Backend returned 0
            console.error('Backend operation failed - returned 0');
            alert('Failed to update pitch. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error updating pitch:', error);
          alert('Error occurred while updating pitch.');
        }
      });
    }
  }

  addPitch() {
    console.log('Data being sent to backend for insert:', this.newPitchData);
    
    this.adminService.insertPitch(this.newPitchData).subscribe({
      next: (result: any) => {
        console.log('Response from backend after insert:', result);
        
        if (result === 1) {
          // Success: Add the pitch to our array with a generated ID
          const pitchToAdd = { 
            ...this.newPitchData, 
            id: Date.now() // Generate a temporary ID since backend doesn't return the actual ID
          };
          this.pitches.push(pitchToAdd);
          console.log('Added pitch with our data:', pitchToAdd);
          this.cancelInsert();
          console.log('Pitch added successfully');
        } else {
          // Failure: Backend returned 0
          console.error('Backend operation failed - returned 0');
          alert('Failed to add pitch. Please try again.');
        }
      }, error: (error) => {
        console.error('Error adding pitch:', error);
        alert('Error occurred while adding pitch.');
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
      coordinates_x: '',
      coordinates_y: '',
      area: '',
    }; 
    this.showAddPitch = false;
  }

  deletePitch(pitchId: number) {
    this.adminService.deletePitch(pitchId).subscribe({
      next: (result: any) => {
        console.log('Response from backend after delete:', result);
        
        if (result === 1) {
          // Success: Remove the pitch from our array
          this.pitches = this.pitches.filter((pitch: any) => pitch.id !== pitchId);
          console.log('Pitch deleted successfully');
        } else {
          // Failure: Backend returned 0
          console.error('Backend operation failed - returned 0');
          alert('Failed to delete pitch. Please try again.');
        }
      }, error: (error) => {
        console.error('Error deleting pitch:', error);
        alert('Error occurred while deleting pitch.');
      }
    });
  }
}
