import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  email: string | undefined;

  constructor(private authService: AuthService) {}

  sendResetEmail() {
    this.authService.forgetPassword(this.email).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }
}
