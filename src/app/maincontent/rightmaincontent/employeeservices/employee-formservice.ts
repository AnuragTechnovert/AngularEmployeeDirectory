import { Injectable, ViewChild } from '@angular/core';
import { findById, getElement, getElementValue, validateEmail, validatePhoneNumber } from '../helper';
import { NgForm } from '@angular/forms';
import { Employee } from '../variables';
import { SharedVaribleService } from './variblesservice';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFormService {
  employeeForm!: any;   //  data get filled in this variable in employeeform component
  sharedVaribleServiceRef : SharedVaribleService | undefined;

  constructor(sharedVaribleServiceRef:SharedVaribleService) {
    this.sharedVaribleServiceRef = sharedVaribleServiceRef;
   }

  populateEditEmpDetailsForm(selectedEmployee: Employee) {
    console.log(this.employeeForm);
    getElement('empDetailContainer').style.display = "none";
    getElement("buttonSubmit").style.display = "none";
    getElement("buttonSubmit").disabled = true;
    getElement("buttonUpdate").style.display = "inline-block";
    this.openEmployeeForm();
    document.querySelector(".emp-form-title")!.textContent = "Edit Employee";
    this.employeeForm.setValue({
      firstName: selectedEmployee.firstName,
      lastName: selectedEmployee.lastName,
      preferredName: selectedEmployee.preferredName,
      email: selectedEmployee.email,
      jobTitle: selectedEmployee.jobTitle,
      office: selectedEmployee.office,
      department: selectedEmployee.department,
      phoneNumber: selectedEmployee.phoneNumber,
      skypeId: selectedEmployee.skypeId,
    });
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
  }
  
  saveDetails = (): void => {
    localStorage.setItem("employees", JSON.stringify(this.sharedVaribleServiceRef!.employeesData));
    this.loadEmpCards(this.sharedVaribleServiceRef!.employeesData);
    this.closeEmployeeForm();
    this.closeDetails();
  }

  closeDetails = (): void => {  // ----> this method closes the emp details popup
    getElement("overlay").style.display = "none";
    getElement("empDetailContainer").style.display = "none";
  }

  loadEmpCards(data: Employee[]) {
    this.sharedVaribleServiceRef!.employeesData = data;
  }
}
