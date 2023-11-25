import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = localStorage.getItem('token');
  constructor(private http: HttpClient, private router: Router) {}

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

    createUser(userData: FormData) {
        return this.http.post(environments.apiUrl + '/register', userData, { responseType: 'text' });
    }

    readUser(email: string, password: string) {
      return this.http.get(`${environments.apiUrl}/login?email=${email}&password=${password}`);
    }

    getLoginAnalytics(day: any) {
      const headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });
      const payload = { days: Number(day)}
      console.log(payload);
      return this.http.post(`${environments.apiUrl}/login-analytics`, payload );
    }

    logout () {
      this.isAuthenticated.next(false);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    }

    // isTokenExpired(token: string): boolean {
    //   try {
    //     const decodedToken = jwt.verify(token, 'yourSecretKey') as { exp: number };
    //     const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  
    //     return decodedToken.exp < currentTime;
    //   } catch (error) {
    //     // Token is invalid or cannot be decoded
    //     return true;
    //   }
    // }
}
