import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { SharedService } from './shared.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpApiResponse } from '../models/httpApiResponse';

@Injectable()
export class EmployeeService {

  constructor(private apiService: ApiService) { }

  public addEmployee(employee: Employee): Observable<any> {
    return this.apiService.post(employee, 'Employee/Add');
  }

  // public getEmployees(): Observable<HttpApiResponse<Employee[]>> {
  //   return this.apiService.get('Employee/Get');
  // }

  public getEmployees(): Observable<Employee[]> {
    return this.apiService.get('Employee/Get');
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.apiService.getById(`Employee/GetById/${employeeId}`);
  }

  public deleteEmployee(employeeId: number): Observable<boolean> {
    return this.apiService.delete(`Employee/Delete/${employeeId}`);
  }

  public updateEmployee(employeeId: number, employee: Employee): Observable<any> {
    return this.apiService.put(employee, `Employee/Update/${employeeId}`);
  }
}

