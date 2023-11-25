import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  registerForm!: FormGroup;
  isReadOnly: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.registerForm = new FormGroup({
      email: new FormControl(userData.email),
      password: new FormControl(userData.hashedPassword),
      first_name: new FormControl(userData.first_name),
      last_name: new FormControl(userData.last_name),
      userType: new FormControl(userData.userType)
    });

    // this.disableForm();
    // this.registerForm.get('userType').disable();
  }

  // disableForm() {
  //   Object.keys(this.registerForm.controls).forEach((key: any) => {
  //     this.registerForm.get(key).disable();
  //   });
  // }

  logout () {
    this.authService.logout()
  }

  navigateToAuth() {
    this.router.navigate(['/register']);
  }
}
