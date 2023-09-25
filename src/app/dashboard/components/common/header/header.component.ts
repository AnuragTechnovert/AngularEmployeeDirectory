import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedinUser: string = '';
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    // const token = localStorage.getItem("jwt");
    // if (token) {
    //   const decodedToken = this.jwtHelper.decodeToken(token);
    //   this.loggedinUser = decodedToken.sub;
    // } else
      // this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['home']);
  }
}
