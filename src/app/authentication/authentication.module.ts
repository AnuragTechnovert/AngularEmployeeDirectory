import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { GoogleSignupComponent } from './components/google-signup/google-signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleSignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthenticationModule { }
