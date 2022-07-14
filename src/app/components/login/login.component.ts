import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  siginForm: FormGroup;
  loginData: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService
  ) {}
  onSubmit() {
    this.AuthService.Login(
      this.siginForm.value.email,
      this.siginForm.value.password
    ).subscribe((resData: any) => {
      // console.log('login', resData);
      this.loginData = resData;
      // console.log('token', this.loginData?.authorisation?.token);
      localStorage.setItem('token', this.loginData?.authorisation?.token);
      this.router.navigate(['home']);
    });
  }
  goToRegister() {
    this.router.navigate(['register']);
  }
  ngOnInit(): void {
    this.siginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
}
