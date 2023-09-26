import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private jwtHelper: JwtHelperService) { }

  public registerUser(registerUser: Register): Observable<any> {
    return this.apiService.post(registerUser, 'Auth/Register');
  }

  public loginRequest(loginUser: Login): Observable<any> {
    return this.apiService.post(loginUser, `Auth/Login`);
  }

  isUserAuthenticated():boolean {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
