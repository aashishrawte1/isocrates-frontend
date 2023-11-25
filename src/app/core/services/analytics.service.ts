import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getAnalytics(payload: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${environments.apiUrl}/analytics`, { days: Number(payload)});
  }
}
