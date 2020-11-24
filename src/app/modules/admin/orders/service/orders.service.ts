import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getOrdersList(userId) {
    let url = `${environment.serviceURL}manager/get_all_orders.php?manager_id=${userId}`;
    return this.http.get(url);
  }

  public getOrdersListWithPagination(userId, pageIndex, offset) {
    let url = `${environment.serviceURL}manager/get_all_orders_new.php?manager_id=${userId}&page_token=${pageIndex}&offset=${offset}`;
    return this.http.get(url);
  }
}
