import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { SharedService } from './shared.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  constructor(private sharedService: SharedService, private apiService: ApiService) { }

  public addEmployee(employee: Employee): void {
    this.apiService.add(employee, 'Employee/Add').subscribe(() => {
      this.getEmployees().subscribe(resp => {
        this.sharedService.updateChanges(resp);
      })
    });
  }

  public getEmployees(): Observable<Employee[]> {
    return this.apiService.get('Employee/Get');
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.apiService.getById(`Employee/GetById/${employeeId}`);
  }

  public deleteEmployee(employeeId: number): void {
    this.apiService.delete(`Employee/Delete/${employeeId}`).subscribe(() => {
      this.getEmployees().subscribe(resp => {
        this.sharedService.updateChanges(resp);
      })
    });
  }

  public updateEmployee(employeeId: number, employee: Employee): void {
    this.apiService.update(employee, `Employee/Update/${employeeId}`).subscribe(() => {
      this.getEmployees().subscribe((resp) => {
        this.sharedService.updateChanges(resp);
      });
    });
  }
}

