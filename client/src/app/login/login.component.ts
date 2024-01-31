

import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
 
    ) {}

  goToRegister() {
    this.router.navigate(['/register'])
  }

  logInForm!: FormGroup;

  ngOnInit(): void {
    this.Form();
  }

  Form() {
    this.logInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  Login() {
    if (this.logInForm.valid) {
      const userData = this.logInForm.value;
      this.auth.logIn(userData).subscribe({
        next: (response: any) => {
          const jwtToken = response;
          localStorage.setItem('token', jwtToken);
          console.log('Signed in successfully! ', response);
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.log('login failed: ', error);
          if (error.status === 500) {
            console.log('error occured!');
          } else {
            console.log('Unexpected error!');
          }
        }
      })
    }
  }

 
}