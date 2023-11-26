import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  newPassword: string | undefined;
  resetToken: string | null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.resetToken = this.route.snapshot.paramMap.get('resetToken');
  }

  resetPassword() {
    this.authService.resetPassword(this.resetToken, this.newPassword).subscribe((response: any) => {
      console.log(response.message);
      this.router.navigate(['/login']);
    }, (error: { error: { message: any; }; }) => {
      console.error(error.error.message);
    }
  );
  }

  
  
}
