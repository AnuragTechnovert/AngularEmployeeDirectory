import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginModel: Login = new Login();

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

   login() {
    this.authService.loginRequest(this.loginModel).subscribe(resp => {
      if(resp.isSuccess)
      {
        const token = resp.data;
        localStorage.setItem("jwt", token!);
        this.router.navigate(['dashboard']);
        this.snackBar.open('Login successfully', 'Dismiss', {
          duration: 3000
        });
      }
      else{
        console.log(resp.errorMessage);
        this.snackBar.open('Please enter valid credentials', 'Dismiss', {
          duration: 3000
        });
      }
   })
   }
}
