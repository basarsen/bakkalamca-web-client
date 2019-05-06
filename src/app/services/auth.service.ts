import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenRequest } from '../models/token-request';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly endPoint = environment.apiEndPoint;
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  GetToken2(token: TokenRequest) {
    return this.http.post(this.endPoint + '/auth/token', token);
  }
  
  Register(token: TokenRequest) {
    return this.http.post<TokenRequest>(this.endPoint + '/auth/register', token);
  }

  Logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
