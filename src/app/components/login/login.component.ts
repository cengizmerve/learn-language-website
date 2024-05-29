import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterService} from "../../services/register.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;
  hide = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private registerService: RegisterService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.registerService.login(this.loginForm.value).subscribe(
    () =>  {
      this.authService.login();
      this.router.navigate(['/courses'])
    },
    error => console.error('Giriş hatası:', error)
);
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}

