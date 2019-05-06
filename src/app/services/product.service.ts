import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly endPoint = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  GetCategories() {
    return this.http.get<Category[]>(`${this.endPoint}/category`);
  }

  GetProducts(categoryId: string) {
    return this.http.get<Product[]>(`${this.endPoint}/product/${categoryId}`);
  }

  Search(searchParam: string) {
    return this.http.get<Product[]>(`${this.endPoint}/product/search/${searchParam}`);
  }
}
