import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //Order model
  readonly endPoint = environment.apiEndPoint;
  constructor(private http: HttpClient) { }

  GetOrders() {
    return this.http.get<Order[]>(`${this.endPoint}/order`);
  }

  Purchase(total: any) {
    return this.http.post(`${this.endPoint}/order`, total);
  }
}
