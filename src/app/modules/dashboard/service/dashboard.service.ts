import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  public getDashboardStats(user_id) {
    let url = `${environment.serviceURL}manager/admin_dashboard.php?user_id=${user_id}`;
    return this.http.get(url);
  }
}
