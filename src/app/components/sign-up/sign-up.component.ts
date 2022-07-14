import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  userData: any;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  onSubmit() {
    this.AuthService.SignUp(
      this.signUpForm.value.username,
      this.signUpForm.value.email,
      this.signUpForm.value.password
    ).subscribe((resData: any) => {
      this.userData = resData;
      // console.log('signup', this.userData);
      // console.log('token', this.userData?.authorisation?.token);
      localStorage.setItem('token', this.userData?.authorisation?.token);
      this.router.navigate(['home']);
    });
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        nameValidator,
      ]),
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
  goToLogin() {
    this.router.navigate(['login']);
  }
}

function nameValidator(control: AbstractControl): ValidationErrors | null {
  const username: string = control.value;
  const regex = /^[a-zA-Z\s]*$/;
  if (regex.test(username)) {
    return null;
  } else {
    return { validName: true };
  }
}
