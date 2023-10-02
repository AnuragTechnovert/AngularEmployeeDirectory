import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerFormModel:Register = new Register();

  constructor(private authService:AuthService,private snackBar:MatSnackBar, private router:Router){}

  registerFormSubmit(){
    this.authService.registerUser(this.registerFormModel).subscribe((resp)=>{
      if(resp.isSuccess){
        this.snackBar.open('User Registered Successfully', 'Dismiss', {
          duration: 3000
        });
        this.router.navigate(['login']);
      }
      else{
        this.snackBar.open('something went wrong', 'Dismiss', {
          duration: 3000
        });
      }
    })
  }
}
