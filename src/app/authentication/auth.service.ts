import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   isloggedIn: boolean;
  constructor(private router:Router) {
    this.isloggedIn = false;
  }

  isUserLoggedIn(userName: string, password: string) {
    if (userName === "Anurag" && password === "1234") {
      this.isloggedIn = true;
      this.router.navigate(['dashboard']);
    }
  }
}
