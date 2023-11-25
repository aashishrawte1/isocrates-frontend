import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      remember_me: new FormControl(false)
    });

    
  }

  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
    console.log(this.loginForm.value);
    this.authService.readUser(form.value.email, form.value.password).subscribe(
      (res: any)=> {
        if(res) {
          localStorage.setItem(
            'userData',
            JSON.stringify(res.user)
          )
          localStorage.setItem('token', res.token);
          localStorage.setItem('rememberMe', this.loginForm.value.remember_me);
          this.authService.isAuthenticated.next(true);
          if(this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard/user-acitvity'])
          }
          // this.authService.isAuthenticated.next(false);//TODO:for logout 
        }
      },
      error=> {
        if(error.status == 404) {
          alert('User does not exist, please register');
          this.router.navigate(['/register']);
        }
      }
    );

  }

  navigateToAuth() {
    this.router.navigate(['/register']);
  }

}
