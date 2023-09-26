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

  loginModel:Login =  new Login(); 

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  login() {
    this.authService.loginRequest(this.loginModel).pipe(
      catchError((error) => {
        //200OK, 404 is when endpoint is not found
        if (error.status === 404) {
          this.snackBar.open('User not found', 'Dismiss', {
            duration: 3000
          });
        } else {
          console.error('Error:', error);
          //either username or password is incorrect
          this.snackBar.open('Enter Valid Details', 'Dismiss', {
            duration: 3000
          });
        }
        return throwError(error);
      })
    ).subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.router.navigate(['dashboard']);
        this.snackBar.open('Login successfully', 'Dismiss', {
          duration: 3000
        });
      });
   }
}
