import { Component } from '@angular/core';
import { TokenRequest } from 'src/app/models/token-request';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bak-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  Register(email: HTMLInputElement, password: HTMLInputElement) {
    const req: TokenRequest = {
      email: email.value,
      password: password.value
    }
    this.authService.Register(req)
      .subscribe(
        resp => {
          this.router.navigate(['login']);
        },
        err => alert(err.error)
      );
  }

}
