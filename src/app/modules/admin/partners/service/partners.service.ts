import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  constructor(private http: HttpClient) {}

  public getPartnerList(userId, lat, long) {
    //'5f2a7e5a47b88'
    let url = `${environment.serviceURL}manager/partner_list.php?manager_id=${userId}&lat=${lat}&long=${long}`;
    return this.http.get(url);
  }

  public getPartnerListWithPagination(userId, lat, long, pageIndex, offset) {
    let url = `${environment.serviceURL}manager/partner_list_new.php?manager_id=${userId}&lat=${lat}&long=${long}&page_token=${pageIndex}&offset=${offset}`;
    return this.http.get(url);
  }
}
