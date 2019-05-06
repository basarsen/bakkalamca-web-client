import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Basket } from '../models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  readonly endPoint = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  GetBasket() {
    return this.http.get(`${this.endPoint}/basket`);
  }

  BasketAction(product: Basket) {
    return this.http.post(`${this.endPoint}/basket`, product); // Todo post type,
  }
  
  ResetBasket() {
    return this.http.get(`${this.endPoint}/basket/reset`); 
  }
}
