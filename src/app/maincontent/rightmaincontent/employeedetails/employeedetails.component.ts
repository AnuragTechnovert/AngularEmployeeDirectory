import { Component, Input } from '@angular/core';
import { Employee } from '../variables';
import { getElement } from '../helper';
import { SharedVaribleService } from '../employeeservices/variblesservice';
import { EmployeeFormService } from '../employeeservices/employeeformservice';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent {
  @Input()
  selectedEmployee!: Employee | undefined;
  employeeFormServiceRef: EmployeeFormService | undefined;
  sharedVaribleServiceRef: SharedVaribleService | undefined;

  constructor(sharedVaribleServiceRef: SharedVaribleService, employeeFormServiceRef: EmployeeFormService) {
    this.sharedVaribleServiceRef = sharedVaribleServiceRef;
    this.employeeFormServiceRef = employeeFormServiceRef;
  }

  closeDetails(): void { 
    getElement("overlay").style.display = "none";
    getElement("empDetailContainer").style.display = "none";
  }

  openEditEmployeeForm(selectedEmployee: Employee) {
    this.sharedVaribleServiceRef!.isEditMode = true;
    this.sharedVaribleServiceRef!.selectedEmployeeId = selectedEmployee.id;
    this.populateEditEmpDetailsForm(selectedEmployee);
  }

  deleteEmployee(employeeId: any) {
    let index = this.sharedVaribleServiceRef!.employeesData!.findIndex(emp => { return emp.id === employeeId; })
    let confirmed = confirm("Are you sure you want to delete This employee?");
    if (confirmed) {
      this.sharedVaribleServiceRef!.employeesData!.splice(index, 1);
      this.employeeFormServiceRef!.saveDetails();
      alert("!!Employee removed!!");
    }
  }

  populateEditEmpDetailsForm(selectedEmployee: Employee) {
    getElement('empDetailContainer').style.display = "none";
    getElement("buttonSubmit").style.display = "none";
    getElement("buttonSubmit").disabled = true;
    getElement("buttonUpdate").style.display = "inline-block";
    this.employeeFormServiceRef!.openEmployeeForm();
    document.querySelector(".emp-form-title")!.textContent = "Edit Employee";
    this.employeeFormServiceRef!.employeeForm.setValue({
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
}


