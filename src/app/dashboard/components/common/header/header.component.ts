import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedinUserName: string = '';
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.loggedinUserName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      // const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } else
      this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['home']);
  }
}
