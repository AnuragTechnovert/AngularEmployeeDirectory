import { Component, Input, ViewChild, booleanAttribute } from '@angular/core';
import { Employee } from '../variables';
import { findById, getElement, setElementValue } from '../helper';
import { RightmaincontentComponent } from '../rightmaincontent.component';
import { SharedVaribleService } from '../employeeservices/variblesservice';
import { EmployeeformComponent } from '../employeeform/employeeform.component';
import { EmployeeFormService } from '../employeeservices/employee-formservice';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent {
  @Input()
  selectedEmployee!: Employee | undefined;

  employeeFormServiceRef: EmployeeFormService | undefined;
  sharedVaribleServiceRef : SharedVaribleService | undefined;

  constructor(sharedVaribleServiceRef: SharedVaribleService, employeeFormServiceRef: EmployeeFormService) {
   this.sharedVaribleServiceRef = sharedVaribleServiceRef;
    this.employeeFormServiceRef = employeeFormServiceRef;
  }

  closeDetails(): void {  // ----> this method closes the emp details popup
    getElement("overlay").style.display = "none";
    getElement("empDetailContainer").style.display = "none";
  }

  openEditEmployeeForm(selectedEmployee: Employee) {
    this.sharedVaribleServiceRef!.isEditMode = true;
    this.employeeFormServiceRef?.populateEditEmpDetailsForm(selectedEmployee);
  }

  deleteEmp(employeeId: any) {
    let index = this.sharedVaribleServiceRef!.employeesData!.findIndex(emp => { return emp.id === employeeId; })
    let confirmed = confirm("Are you sure you want to delete This employee?");
    if (confirmed) {
      this.sharedVaribleServiceRef!.employeesData!.splice(index, 1);
      this.employeeFormServiceRef!.saveDetails();
      alert("!!Employee removed!!");
    }

  }
}


