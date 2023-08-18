import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/modals/employee';
import { SharedService } from './shared.service';

@Injectable()
export class EmployeeService {

  constructor(private sharedService: SharedService) { }

  public addEmployee(employeeForm: NgForm): void {
    let employeesData: Employee[] = JSON.parse(localStorage.getItem('employees')!);
    employeesData.push(new Employee({
      id: new Date().getTime(),
      firstName: employeeForm.value.firstName,
      lastName: employeeForm.value.lastName,
      preferredName: employeeForm.value.preferredName,
      email: employeeForm.value.email,
      jobTitle: employeeForm.value.jobTitle,
      office: employeeForm.value.office,
      department: employeeForm.value.department,
      phoneNumber: employeeForm.value.phoneNumber,
      skypeId: employeeForm.value.skypeId,
    }));
    localStorage.setItem('employees', JSON.stringify(employeesData));
    this.sharedService.updateChanges(employeesData);
  }

  public getEmployees(): Employee[] {
    return  JSON.parse(localStorage.getItem('employees')!);
  }

  public getEmployeeById(employeeId: number): Employee {
    return JSON.parse(localStorage.getItem('employees')!).find((emp: Employee) => emp.id == employeeId)!;
  }

  public deleteEmployee(employeeId: number): void {
    let employeesData: Employee[] = JSON.parse(localStorage.getItem('employees')!);
    if (employeesData) {
      let index = employeesData.findIndex((emp: Employee) => { return emp.id === employeeId; });
      employeesData.splice(index, 1);
      localStorage.setItem('employees', JSON.stringify(employeesData));
      this.sharedService.updateChanges(employeesData);
    }
  }

  public updateEmployee(employeeId: number, employeeForm: NgForm): void {
    let employeesData: Employee[] = JSON.parse(localStorage.getItem('employees')!);
    if (employeesData) {
      let employeeToUpdate = employeesData.find((emp: Employee) => emp.id == employeeId)!;
      employeeToUpdate.firstName = employeeForm.value.firstName;
      employeeToUpdate.lastName = employeeForm.value.lastName;
      employeeToUpdate.preferredName = employeeForm.value.preferredName;
      employeeToUpdate.email = employeeForm.value.email;
      employeeToUpdate.jobTitle = employeeForm.value.jobTitle;
      employeeToUpdate.office = employeeForm.value.office;
      employeeToUpdate.department = employeeForm.value.department;
      employeeToUpdate.phoneNumber = employeeForm.value.phoneNumber;
      employeeToUpdate.skypeId = employeeForm.value.skypeId;
      localStorage.setItem('employees', JSON.stringify(employeesData));
      this.sharedService.updateChanges(employeesData);
    }
  }
}

