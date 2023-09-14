import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginModel = {
    userName: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  login() {
    this.authService.loginRequest(this.loginModel).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.snackBar.open('User not found', 'Dismiss', {
            duration: 3000
          });
        } else {
          console.error('Error:', error);
          this.snackBar.open('Enter Valid Details', 'Dismiss', {
            duration: 3000
          });
        }
        return throwError(error);
      })
    ).
      subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.router.navigate(['dashboard']);
        this.snackBar.open('Login successfully', 'Dismiss', {
          duration: 3000
        });
      });
  }
}
