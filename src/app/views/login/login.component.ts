import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenRequest } from 'src/app/models/token-request';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bak-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  Token(email: HTMLInputElement, password: HTMLInputElement) {
    const req: TokenRequest = {
      email: email.value,
      password: password.value
    }
    this.authService.GetToken2(req)
      .subscribe(
        (resp: any) => {
          if (resp.token) {
            localStorage.setItem('token', resp.token)
            this.router.navigate(['/']);
          } else alert('Bir hata oluştu.');

        },
        (err: HttpErrorResponse) => {
          if (err.status === 400)
            alert('E-posta veya şifre hatalı.');
        });
  }

}
