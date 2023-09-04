import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   isloggedIn: boolean;
  constructor(private router:Router, private userService:UserService) {
    this.isloggedIn = false;
  }

  isUserLoggedIn(userName: string, password: string) {
    console.log("This is logged in user")
    this.userService.getUser(userName).subscribe(resp=>{
      console.log(resp);
    })
    if (userName === "Anurag" && password === "1234") {
      this.isloggedIn = true;
      this.router.navigate(['dashboard']);
    }
  }
  // isUserLoggedIn(userName: string, password: string) {
  //   if (userName === "Anurag" && password === "1234") {
  //     this.isloggedIn = true;
  //     this.router.navigate(['dashboard']);
  //   }
  // }
}
