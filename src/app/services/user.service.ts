import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public registerUser(user: User): void {
    this.apiService.add(user, 'User/SignUp');
  }

  public getUser(userName: string): Observable<User> {
    return this.apiService.getByDetails(`User/LogIn/${userName}`);
  }
}
