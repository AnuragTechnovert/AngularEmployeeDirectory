import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { findById, getElement, getElementValue, setElementValue, validateEmail, validatePhoneNumber } from '../helper';
import { Employee } from '../variables';
import { RightmaincontentComponent } from '../rightmaincontent.component';
import { NgForm } from '@angular/forms';
import { SharedVaribleService } from '../employeeservices/variblesservice';
import { EmployeeFormService } from '../employeeservices/employee-formservice';


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
      localStorage.setItem('employees', JSON.stringify(this.sharedVaribleServiceRef!.employeesData));
      alert("Employee data added successfully");
      this.employeeFormServiceRef.saveDetails();
    }
  }

  updateEmployeeDetails(employeeform: NgForm) {
    //  let existEmployee = this.sharedVaribleServiceRef?.employeesData.find((emp:any)=> emp.id == employeeform.value.id);
    if (this.employeeFormServiceRef!.isFormValid(employeeform)) {
    let employeeToUpdate = findById(employeeform.value.id, this.sharedVaribleServiceRef?.employeesData);
    employeeToUpdate.firstName = employeeform.value.firstName;
    employeeToUpdate.lastName = employeeform.value.lastName;
    employeeToUpdate.preferredName = employeeform.value.preferredName;
    employeeToUpdate.email = employeeform.value.email;
    employeeToUpdate.jobTitle = employeeform.value.jobTitle;
    employeeToUpdate.office = employeeform.value.office;
    employeeToUpdate.department = employeeform.value.department;
    employeeToUpdate.phoneNumber = employeeform.value.phoneNumber;
    employeeToUpdate.skypeId = employeeform.value.skypeId;
    this.employeeFormServiceRef!.saveDetails();
    alert("Details Updated Successfully");
    }
  }

  closeEmployeeForm() {
    this.sharedVaribleServiceRef!.isEditMode = false;
    this.employeeFormServiceRef?.closeEmployeeForm();
  }
}


