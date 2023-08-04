import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { findById } from '../helper';
import { Employee } from '../variables';
import { NgForm } from '@angular/forms';
import { SharedVaribleService } from '../employeeservices/variblesservice';
import { EmployeeFormService } from '../employeeservices/employeeformservice';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})

export class EmployeeformComponent implements AfterViewInit {

  lastEmpid: number = 0;
  employeeFormServiceRef: EmployeeFormService | undefined;
  sharedVaribleServiceRef: SharedVaribleService | undefined;

  @ViewChild('employeeForm') employeeForm!: NgForm;

  constructor(sharedVaribleServiceRef: SharedVaribleService, employeeFormServiceRef: EmployeeFormService) {

    this.employeeFormServiceRef = employeeFormServiceRef;
    this.sharedVaribleServiceRef = sharedVaribleServiceRef;

    if (this.sharedVaribleServiceRef.employeesData)
      this.lastEmpid = this.sharedVaribleServiceRef!.employeesData[this.sharedVaribleServiceRef!.employeesData.length - 1].id;
  }

  ngAfterViewInit() {
    this.employeeFormServiceRef!.employeeForm = this.employeeForm;
  }

  addEmployeeDetails = (employeeform: NgForm): void => {

    if (this.employeeFormServiceRef?.isFormValid(employeeform)) {
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
      this.sharedVaribleServiceRef!.employeesData.push(emp);
      this.employeeFormServiceRef.saveDetails();
      alert("Employee data added successfully");
    }
  }

  updateEmployeeDetails(employeeForm: NgForm): void {

    if (this.employeeFormServiceRef!.isFormValid(employeeForm)) {
      let employeeToUpdate = findById(this.sharedVaribleServiceRef?.selectedEmployeeId, this.sharedVaribleServiceRef?.employeesData)
      employeeToUpdate!.firstName = employeeForm.value.firstName;
      employeeToUpdate!.lastName = employeeForm.value.lastName;
      employeeToUpdate!.preferredName = employeeForm.value.preferredName;
      employeeToUpdate!.email = employeeForm.value.email;
      employeeToUpdate!.jobTitle = employeeForm.value.jobTitle;
      employeeToUpdate!.office = employeeForm.value.office;
      employeeToUpdate!.department = employeeForm.value.department;
      employeeToUpdate!.phoneNumber = employeeForm.value.phoneNumber;
      employeeToUpdate!.skypeId = employeeForm.value.skypeId;
      this.employeeFormServiceRef!.saveDetails();
      alert("Details Updated Successfully");
    }
  }

  closeEmployeeForm() {
    this.sharedVaribleServiceRef!.isEditMode = false;
    this.employeeFormServiceRef?.closeEmployeeForm();
  }
}


