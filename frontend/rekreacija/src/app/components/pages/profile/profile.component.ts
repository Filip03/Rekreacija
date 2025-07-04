import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { KorisnikService, UserProfile } from 'src/app/services/korisnik.service';
import { CommonModule } from '@angular/common';
import { toSvg } from 'jdenticon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user: UserProfile | null = null
  profileForm: FormGroup
  isLoading = true
  userAvatarSvg: SafeHtml = '';

  constructor(private fb: FormBuilder, private korisnikService: KorisnikService, private sanitizer: DomSanitizer) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
  }
  ngOnInit(){
    this.korisnikService.getProfile().subscribe(data =>{
      this.user = data
      this.profileForm.patchValue({
        username: data.username,
        phone_number: data.phone_number
      });
      this.isLoading = false 
      const svgString = toSvg(data.username, 110);
      this.userAvatarSvg = this.sanitizer.bypassSecurityTrustHtml(svgString);
    })
  }

  onSubmit(): void {
    if(this.profileForm.invalid){
      return
    }

    this.korisnikService.upditeProfile(this.profileForm.value).subscribe({
      next: (response: { noviToken: string }) =>{
        alert('Profil uspešno ažuriran!');
        this.korisnikService.saveToken(response.noviToken);
        if (this.user) {
          this.user.username = this.profileForm.value.username;
          this.user.phone_number = this.profileForm.value.phone_number;
        }
      },
      error: (err) => {
        alert('Došlo je do greške prilikom ažuriranja.');
        console.error(err);
      }
    })
  }
}
