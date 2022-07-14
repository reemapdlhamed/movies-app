import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  SignUp(name: string, email: string, password: any) {
    return this.http.post<User>(`${environment.apiUrl}/api/register`, {
      name,
      email,
      password,
    });
  }
  Login(email: string, password: any) {
    return this.http.post<User>(`${environment.apiUrl}/api/login`, {
      email,
      password,
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logOut() {
    localStorage.clear();
  }
}
