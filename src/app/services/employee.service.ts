import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { SharedService } from './shared.service';

@Injectable()
export class EmployeeService {

  constructor(private sharedService: SharedService) { }

  public addEmployee(employee: Employee): void {
    let employeesData: Employee[] = this.getEmployees();
    employeesData.push(employee);
    localStorage.setItem('employees', JSON.stringify(employeesData));
    this.sharedService.updateChanges(employeesData);
  }

  public getEmployees(): Employee[] {
    let employeesData: Employee[] = JSON.parse(localStorage.getItem('employees')!)
    if (employeesData)
      return employeesData;
    return [];
  }

  public getEmployeeById(employeeId: number): Employee {
    return JSON.parse(localStorage.getItem('employees')!).find((emp: Employee) => emp.id == employeeId)!;
  }

  public deleteEmployee(employeeId: number): void {
    let employeesData: Employee[] = this.getEmployees();
    if (employeesData) {
      let index = employeesData.findIndex((emp: Employee) => { return emp.id === employeeId; });
      employeesData.splice(index, 1);
      localStorage.setItem('employees', JSON.stringify(employeesData));
      this.sharedService.updateChanges(employeesData);
    }
  }

  public updateEmployee(employeeId: number, employee: Employee): void {
    let employeesData: Employee[] = this.getEmployees();
    if (employeesData) {
      let employeeToUpdate = employeesData.find((emp: Employee) => emp.id == employeeId)!;
      Object.assign(employeeToUpdate, employee);
      localStorage.setItem('employees', JSON.stringify(employeesData));
      this.sharedService.updateChanges(employeesData);
    }
  }
}

