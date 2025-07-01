import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TeamComponent implements OnInit {
  currentUser: any = null;
  userTeam: any = null;
  allTeams: any[] = [];
  allUsers: any[] = [];

  isLoading = false;
  error: string | null = null;

  editingTeam = false;
  editedTeamName = '';

  selectedUserIdsForEdit: number[] = [];

  showCreateForm = false;
  newTeamName = '';
  selectedUserIdsForNewTeam: number[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.isLoading = true;
    // Učitaj trenutno prijavljenog korisnika (npr. iz auth servisa)
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    // Pretpostavimo da imaš neki auth servis ili ovdje simuliramo
    // Ovo treba zameniti stvarnom logikom autentikacije
    // Za primer: učitaj korisnika sa id=2
    this.teamService.getUserById(2).subscribe({
      next: user => {
        this.currentUser = user;
        if (user.team_id) {
          this.loadUserTeam(user.team_id);
        } else {
          this.loadAllTeams();
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Ne mogu da učitam korisnika.';
        this.isLoading = false;
      }
    });
  }

  loadUserTeam(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe({
      next: team => {
        this.userTeam = team;
        this.editedTeamName = team.name;
        this.selectedUserIdsForEdit = team.members.map((m: any) => m.id);
      },
      error: () => {
        this.error = 'Ne mogu da učitam ekipu.';
      }
    });
  }

  loadAllTeams() {
    this.teamService.getAllTeams().subscribe({
      next: teams => {
        this.allTeams = teams;
        this.loadAllUsers();
      },
      error: () => {
        this.error = 'Ne mogu da učitam ekipe.';
      }
    });
  }

  loadAllUsers() {
    this.teamService.getAllUsers().subscribe({
      next: users => {
        this.allUsers = users;
      },
      error: () => {
        this.error = 'Ne mogu da učitam korisnike.';
      }
    });
  }

  leaveTeam() {
    if (!this.currentUser) return;
    this.teamService.updateUser(this.currentUser.id, { team_id: null }).subscribe({
      next: () => {
        this.currentUser.team_id = null;
        this.userTeam = null;
        this.loadAllTeams();
      },
      error: () => {
        this.error = 'Ne mogu da napustim ekipu.';
      }
    });
  }

  startEditing() {
    this.editingTeam = true;
    this.loadAllUsersForAdd();
  }

  cancelEditing() {
    this.editingTeam = false;
    this.editedTeamName = this.userTeam.name;
    this.selectedUserIdsForEdit = this.userTeam.members.map((m: any) => m.id);
  }

  loadAllUsersForAdd() {
    this.teamService.getAllUsers().subscribe({
      next: users => {
        this.allUsers = users.filter((u: any) => u.id !== this.currentUser.id);
      },
      error: () => {
        this.error = 'Ne mogu da učitam korisnike.';
      }
    });
  }

  toggleUserInEdit(userId: number) {
    const idx = this.selectedUserIdsForEdit.indexOf(userId);
    if (idx > -1) {
      this.selectedUserIdsForEdit.splice(idx, 1);
    } else {
      this.selectedUserIdsForEdit.push(userId);
    }
  }

  saveTeamChanges() {
    if (!this.userTeam) return;

    this.teamService.updateTeam(this.userTeam.id, { name: this.editedTeamName }).subscribe({
      next: () => {
        this.updateTeamMembers();
      },
      error: () => {
        this.error = 'Nije moguće sačuvati promene naziva ekipe.';
      }
    });
  }

  updateTeamMembers() {
    if (!this.userTeam) return;

    const currentMemberIds = this.userTeam.members.map((m: any) => m.id);
    const newMemberIds = this.selectedUserIdsForEdit;

    const toRemove = currentMemberIds.filter((id: number) => !newMemberIds.includes(id));
    const toAdd = newMemberIds.filter(id => !currentMemberIds.includes(id));

    const removeObservables = toRemove.map((id: number) =>
      this.teamService.updateUser(id, { team_id: null })
    );
    const addObservables = toAdd.map(id =>
      this.teamService.updateUser(id, { team_id: this.userTeam.id })
    );

    forkJoin([...removeObservables, ...addObservables]).subscribe({
      next: () => {
        this.loadUserTeam(this.userTeam.id);
        this.editingTeam = false;
      },
      error: () => {
        this.error = 'Nije moguće ažurirati članove ekipe.';
      }
    });
  }

  joinTeam(teamId: number) {
    if (!this.currentUser) return;
    this.teamService.updateUser(this.currentUser.id, { team_id: teamId }).subscribe({
      next: () => {
        this.currentUser.team_id = teamId;
        this.loadUserTeam(teamId);
      },
      error: () => {
        this.error = 'Nije moguće pridružiti se timu.';
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.loadAllUsers();
    }
  }

  toggleUserForNewTeam(userId: number) {
    const idx = this.selectedUserIdsForNewTeam.indexOf(userId);
    if (idx > -1) {
      this.selectedUserIdsForNewTeam.splice(idx, 1);
    } else {
      this.selectedUserIdsForNewTeam.push(userId);
    }
  }

  createTeam() {
    if (!this.newTeamName) {
      this.error = 'Unesite naziv ekipe.';
      return;
    }
    // Kreiraš ekipu, backend treba da dodijeli creator_id na currentUser.id
    this.teamService.createTeam({ name: this.newTeamName, creator_id: this.currentUser.id }).subscribe({
      next: (createdTeam) => {
        // Dodaj creator-u team_id
        this.teamService.updateUser(this.currentUser.id, { team_id: createdTeam.id }).subscribe({
          next: () => {
            // Dodaj odabrane korisnike u tim
            const addUsersObservables = this.selectedUserIdsForNewTeam.map(userId =>
              this.teamService.updateUser(userId, { team_id: createdTeam.id })
            );
            forkJoin(addUsersObservables).subscribe({
              next: () => {
                this.currentUser.team_id = createdTeam.id;
                this.loadUserTeam(createdTeam.id);
                this.showCreateForm = false;
                this.newTeamName = '';
                this.selectedUserIdsForNewTeam = [];
                this.error = null;
              },
              error: () => {
                this.error = 'Nije moguće dodati korisnike u novu ekipu.';
              }
            });
          },
          error: () => {
            this.error = 'Nije moguće postaviti team_id za kreatora.';
          }
        });
      },
      error: () => {
        this.error = 'Nije moguće kreirati novu ekipu.';
      }
    });
  }
}
