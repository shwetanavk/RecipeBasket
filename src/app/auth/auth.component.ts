import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.error = null;

    let authObj: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObj = this.authService.signin(email, password);
    } else {
      authObj = this.authService.signup(email, password);
    }

    authObj.subscribe({
      next: (resData) => {
        console.log('Signup success:', resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.error('Signup failed:', errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => {
        console.log('Signup process completed.');
      },
    });

    authForm.reset();
  }
}
