import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/constants/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      userType: new FormControl('', Validators.required)
    }, { validators: passwordMatchValidator('password', 'confirm_password') });
  }

  onSubmit(form: FormGroup) {
    if(form.errors && form.errors['passwordMismatch']) {
      alert(
        'password mismatch'
      );
    }
    const userFormData = new FormData();
    userFormData.append('first_name', form.value.first_name);
    userFormData.append('last_name', form.value.last_name);
    userFormData.append('email', form.value.email);
    userFormData.append('password', form.value.password);
    userFormData.append('userType', form.value.userType);
    this.authService.createUser(userFormData).subscribe(
      (res: any)=> {
        console.log('res', JSON.parse(res));
        if(res) {
          localStorage.setItem(
            'userData',
            JSON.stringify(res.data)
          )
          localStorage.setItem('token', res.token);
          this.authService.isAuthenticated.next(true);
          if(this.authService.isLoggedIn) {
            // this.router.navigate(['/dashboard/user-acitvity'])
          }
          // this.authService.isAuthenticated.next(false);//TODO:for logout 
        }
      },
      (error)=> {
        if(error.status == 409) {
          alert('user already exists, please login');
          this.router.navigate(['/login']);
        }
      }
    );

  }

  navigateToAuth() {
    this.router.navigate(['/login']);
  }

}
