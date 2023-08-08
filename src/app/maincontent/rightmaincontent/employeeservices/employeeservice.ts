import { Injectable, ViewChild } from '@angular/core';
import { findById, getElement, getElementValue, validateEmail, validatePhoneNumber } from '../helper';
import { NgForm } from '@angular/forms';
import { Employee } from '../variables';
import { SharedService } from './sharedservice';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeForm!: any;   //  data get filled in this variable in employeeform component
  sharedVaribleServiceRef : SharedService | undefined;

  constructor(sharedVaribleServiceRef:SharedService) {
    this.sharedVaribleServiceRef = sharedVaribleServiceRef;
   }

  isFormValid = (employeeform: NgForm): boolean => {
    let firstName = employeeform.value.firstName.trim();
    let lastName = employeeform.value.lastName.trim();
    let email = employeeform.value.email.trim();
    let phoneNumber = employeeform.value.phoneNumber.trim();
    let skypeId = employeeform.value.skypeId.trim();

    if (firstName === "") {
      alert("Please enter your first name.");
      return false;
    }

    if (lastName === "") {
      alert("Please enter your last name.");
      return false;
    }

    if (email === "") {
      alert("Please enter your email address.");
      return false;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (phoneNumber === "") {
      alert("Please enter your phone number.");
      return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return false;
    }

    if (skypeId === "") {
      alert("Please enter your Skype ID.");
      return false;
    }

    return true;
  }

  openEmployeeForm(): void {
    document.querySelector(".emp-form-title")!.textContent = "Add Employee";
    getElement("overlay").style.display = "block";
    getElement('userFormContainer').style.display = "block";
  }

  closeEmployeeForm() {
    getElement("buttonSubmit").style.display = "inline-block";
    getElement("buttonSubmit").disabled = false;
    getElement("buttonUpdate").style.display = "none";
    getElement("overlay").style.display = "none";
    getElement("userFormContainer").style.display = "none";
    this.employeeForm.reset();
  }
  
  saveDetails = (): void => {
    localStorage.setItem("employees", JSON.stringify(this.sharedVaribleServiceRef!.employeesData));
    this.sharedVaribleServiceRef!.updateEmployees(this.sharedVaribleServiceRef!.employeesData);
    this.closeEmployeeForm();
    this.closeDetails();
  }

  closeDetails = (): void => {  // ----> this method closes the emp details popup
    getElement("overlay").style.display = "none";
    getElement("empDetailContainer").style.display = "none";
  }
}
