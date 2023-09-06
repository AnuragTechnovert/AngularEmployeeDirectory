import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerFormModel:User = {
    userName: '',
    email: '',
    password: ''
  }

  constructor(private authService:AuthService,private snackBar:MatSnackBar, private router:Router){}

  onRegisterFormSubmit(){
    this.authService.registerUser(this.registerFormModel).subscribe(()=>{
      this.snackBar.open('User Registered Successfully', 'Dismiss', {
        duration: 3000
      });
      this.router.navigate(['login']);
    })
  }
}
