import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { SharedService } from './shared.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Departments } from '../models/departments';
import { Offices } from '../models/offices';
import { JobTitles } from '../models/jobtitles';

@Injectable()
export class EmployeeService {

  constructor(private sharedService: SharedService, private apiService: ApiService) { }

  public addEmployee(employee: Employee): void {
    console.log(employee);
    this.apiService.post(employee, 'Employee/Add').subscribe(() => {
      this.getEmployees().subscribe(resp => {
        this.sharedService.updateChanges(resp);
      })
    });
  }

  public getEmployees(): Observable<Employee[]> {
    return this.apiService.get('Employee/Get');
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.apiService.getByDetails(`Employee/GetById/${employeeId}`);
  }

  public deleteEmployee(employeeId: number): void {
    this.apiService.delete(`Employee/Delete/${employeeId}`).subscribe(() => {
      this.getEmployees().subscribe(resp => {
        this.sharedService.updateChanges(resp);
      })
    });
  }

  public updateEmployee(employeeId: number, employee: Employee): void {
    this.apiService.put(employee, `Employee/Update/${employeeId}`).subscribe(() => {
      this.getEmployees().subscribe((resp) => {
        this.sharedService.updateChanges(resp);
      });
    });
  }

  public getDepartments():Observable<Departments[]>{
    return this.apiService.get('Employee/Departments');
  }

  public getOffices():Observable<Offices[]>{
    return this.apiService.get('Employee/Offices');
  }

  public getJobTitles():Observable<JobTitles[]>{
    return this.apiService.get('Employee/JobTitles');
  }
}

