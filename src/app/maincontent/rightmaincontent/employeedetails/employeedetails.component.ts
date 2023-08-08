import { Component, Input } from '@angular/core';
import { Employee } from '../variables';
import { getElement } from '../helper';
import { SharedService } from '../../../comman/employeeservices/sharedservice';
import { EmployeeService } from '../../../comman/employeeservices/employeeservice';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent {
  @Input()
  selectedEmployee!: Employee | undefined;
  employeeService: EmployeeService | undefined;
  sharedService: SharedService | undefined;

  constructor(sharedService: SharedService, employeeService: EmployeeService) {
    this.sharedService = sharedService;
    this.employeeService = employeeService;
  }

  closeDetails(): void { 
    getElement("overlay").style.display = "none";
    getElement("empDetailContainer").style.display = "none";
  }

  openEditEmployeeForm(selectedEmployee: Employee) {
    this.sharedService!.isEditMode = true;
    this.sharedService!.selectedEmployeeId = selectedEmployee.id;
    this.populateEditEmpDetailsForm(selectedEmployee);
  }

  deleteEmployee(employeeId: any) {
    let index = this.sharedService!.employeesData!.findIndex(emp => { return emp.id === employeeId; })
    let confirmed = confirm("Are you sure you want to delete This employee?");
    if (confirmed) {
      this.sharedService!.employeesData!.splice(index, 1);
      this.employeeService!.saveDetails();
      alert("!!Employee removed!!");
    }
  }

  populateEditEmpDetailsForm(selectedEmployee: Employee) {
    getElement('empDetailContainer').style.display = "none";
    getElement("buttonSubmit").style.display = "none";
    getElement("buttonSubmit").disabled = true;
    getElement("buttonUpdate").style.display = "inline-block";
    this.employeeService!.openEmployeeForm();
    document.querySelector(".emp-form-title")!.textContent = "Edit Employee";
    this.employeeService!.employeeForm.setValue({
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


