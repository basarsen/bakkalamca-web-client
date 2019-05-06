import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly endPoint = environment.apiEndPoint;
  constructor(private http: HttpClient) { }

  GetCustomer() {
    return this.http.get<Customer>(`${this.endPoint}/customer`);
  }

  UpdateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${this.endPoint}/customer`, customer);
  }
}
