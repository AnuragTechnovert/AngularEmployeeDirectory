import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { findById } from '../helper';
import { Employee } from '../variables';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../../common/employeeservices/sharedservice';
import { EmployeeService } from '../../../common/employeeservices/employeeservice';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})

export class EmployeeformComponent implements AfterViewInit {

  lastEmpid: number = 0;
  employeeService: EmployeeService | undefined;
  sharedService: SharedService | undefined;

  @ViewChild('employeeForm') employeeForm!: NgForm;

  constructor(sharedService: SharedService, employeeService: EmployeeService) {

    this.employeeService = employeeService;
    this.sharedService = sharedService;

    if (this.sharedService.employeesData)
      this.lastEmpid = this.sharedService!.employeesData[this.sharedService!.employeesData.length - 1].id;
  }

  ngAfterViewInit() {
    this.employeeService!.employeeForm = this.employeeForm;
  }

  addEmployeeDetails = (employeeform: NgForm): void => {

    if (this.employeeService?.isFormValid(employeeform)) {
      this.lastEmpid++;
      let firstName = employeeform.value.firstName;
      let lastName = employeeform.value.lastName;
      let preferredName = employeeform.value.preferredName;
      let email = employeeform.value.email;
      let jobTitle = employeeform.value.jobTitle;
      let office = employeeform.value.office;
      let department = employeeform.value.department;
      let phoneNumber = employeeform.value.phoneNumber;
      let skypeId = employeeform.value.skypeId;
      let emp: Employee = {
        id: this.lastEmpid,
        firstName: firstName,
        lastName: lastName,
        preferredName: preferredName,
        email: email,
        jobTitle: jobTitle,
        office: office,
        department: department,
        phoneNumber: phoneNumber,
        skypeId: skypeId
      }
      this.sharedService!.employeesData.push(emp);
      this.employeeService.saveDetails();
      alert("Employee data added successfully");
    }
  }

  updateEmployeeDetails(employeeForm: NgForm): void {

    if (this.employeeService!.isFormValid(employeeForm)) {
      let employeeToUpdate = findById(this.sharedService?.selectedEmployeeId, this.sharedService?.employeesData)
      employeeToUpdate!.firstName = employeeForm.value.firstName;
      employeeToUpdate!.lastName = employeeForm.value.lastName;
      employeeToUpdate!.preferredName = employeeForm.value.preferredName;
      employeeToUpdate!.email = employeeForm.value.email;
      employeeToUpdate!.jobTitle = employeeForm.value.jobTitle;
      employeeToUpdate!.office = employeeForm.value.office;
      employeeToUpdate!.department = employeeForm.value.department;
      employeeToUpdate!.phoneNumber = employeeForm.value.phoneNumber;
      employeeToUpdate!.skypeId = employeeForm.value.skypeId;
      this.employeeService!.saveDetails();
      alert("Details Updated Successfully");
    }
  }

  closeEmployeeForm() {
    this.sharedService!.isEditMode = false;
    this.employeeService?.closeEmployeeForm();
  }
}


