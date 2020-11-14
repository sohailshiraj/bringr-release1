import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUserList(userId, lat, long) {
    let url = `${environment.serviceURL}manager/user_list.php?manager_id=${userId}&lat=${lat}&long=${long}`;
    return this.http.get(url);
  }
}
