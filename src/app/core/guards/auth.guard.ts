// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isTokenExpired: boolean | undefined;
  
  constructor(private router: Router, private authService: AuthService) {
    // Attach an event listener to the 'beforeunload' event
    window.addEventListener('beforeunload', () => {
      if(localStorage.getItem('rememberMe') == 'false') {
        this.authService.logout()
      }
      
    });
  }
  // clearLocalStorage() {
    
  //     this.authService.isAuthenticated.next(false);
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('userData');
  //     this.router.navigate(['/login']);
    
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        // If both token and user data are present, allow access
        return true;
      } else {
        // If either token or user data is missing, redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }
      // return this.authService.isLoggedIn;
    }

    ngOnInit() {
      // Replace 'your-actual-token' with the actual JWT token
      // const jwtToken = 'your-actual-token';
      // this.isTokenExpired = this.authService.isTokenExpired(jwtToken);
  
      // // if (this.isTokenExpired) {
      // //   this.authService.logout();
      // // }
    }
}
