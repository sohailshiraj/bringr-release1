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

  public getUserListWithPagination(
    userId,
    lat,
    long,
    pageIndex,
    offset,
    searchValue
  ) {
    let searchUrlString = searchValue == '' ? '' : `&search=${searchValue}`;
    let url = `${environment.serviceURL}manager/user_list_new.php?manager_id=${userId}&lat=${lat}&long=${long}&page_token=${pageIndex}&offset=${offset}${searchUrlString}`;
    return this.http.get(url);
  }
}
