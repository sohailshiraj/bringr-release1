import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  adminLogin(username, password) {
    let payload = {
      username: username,
      password: password,
      type: 'admin',
    };
    let url = environment.serviceURL + 'manager/admin_login.php';
    return this.http.post(url, payload);
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.clear();

    // Return the observable
    return of(true);
  }
}
