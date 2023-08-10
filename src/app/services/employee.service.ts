import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/modals/employee';
import { SharedService } from './datasharedservice';

@Injectable()
export class EmployeeService {

  employeesData: Employee[] = [];
  lastEmpid: number = 0;

  constructor(private dataSharingService: SharedService) {
    this.employeesData = this.dataSharingService.employeesData;
    this.lastEmpid = this.employeesData[this.employeesData.length - 1].id;
  }

  public addEmployee(employeeForm: NgForm): void {
    this.lastEmpid++;
    const employee = new Employee({
      id: this.lastEmpid,
      firstName: employeeForm.value.firstName,
      lastName: employeeForm.value.lastName,
      preferredName: employeeForm.value.preferredName,
      email: employeeForm.value.email,
      jobTitle: employeeForm.value.jobTitle,
      office: employeeForm.value.office,
      department: employeeForm.value.department,
      phoneNumber: employeeForm.value.phoneNumber,
      skypeId: employeeForm.value.skypeId,
    });
    this.employeesData.push(employee);
    localStorage.setItem('employees', JSON.stringify(this.employeesData));
    this.dataSharingService.updateChanges(this.employeesData);
  }

  public getEmployees(): Employee[] {
    return this.employeesData;
  }

  public getEmployeeById(employeeId: number): Employee {
    return this.employeesData.find((emp: Employee) => emp.id == employeeId)!;
  }

  public deleteEmployee(employeeId: number): void {
    let index = this.employeesData!.findIndex(emp => { return emp.id === employeeId; })
    this.employeesData.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(this.employeesData));
    this.dataSharingService.updateChanges(this.employeesData);
  }

  public updateEmployee(employeeId: number, employeeForm: NgForm): void {
    let employeeToUpdate = this.getEmployeeById(employeeId);
    employeeToUpdate!.firstName = employeeForm.value.firstName;
    employeeToUpdate!.lastName = employeeForm.value.lastName;
    employeeToUpdate!.preferredName = employeeForm.value.preferredName;
    employeeToUpdate!.email = employeeForm.value.email;
    employeeToUpdate!.jobTitle = employeeForm.value.jobTitle;
    employeeToUpdate!.office = employeeForm.value.office;
    employeeToUpdate!.department = employeeForm.value.department;
    employeeToUpdate!.phoneNumber = employeeForm.value.phoneNumber;
    employeeToUpdate!.skypeId = employeeForm.value.skypeId;
    localStorage.setItem('employees', JSON.stringify(this.employeesData));
    this.dataSharingService.updateChanges(this.employeesData);
  }
}

