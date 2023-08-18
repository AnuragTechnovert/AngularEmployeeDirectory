import { Component, ViewChild } from '@angular/core';
import { getElement, isFormValid } from '../helper/helper';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Employee } from 'src/app/modals/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})

export class EmployeeformComponent {

  employeeService: EmployeeService;
  sharedService: SharedService;
  isEditMode: boolean = false;
  isDetailsForm: boolean = false;
  selectedEmployee!: Employee;  
 
  @ViewChild('employeeForm') employeeForm!: NgForm;

  constructor(sharedService: SharedService, employeeService: EmployeeService,private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.employeeService = employeeService;
    this.sharedService = sharedService;
  }

  addEmployee(employeeForm: NgForm) {
    if (isFormValid(employeeForm, this.snackBar)) {
      this.employeeService.addEmployee(employeeForm);
      this.snackBar.open('Employee Added Successfully', 'Dismiss', {
        duration: 3000,
      });
      this.closeEmployeeForm();
    }
  }

  updateEmployee(employeeForm: NgForm): void {
    if (isFormValid(employeeForm, this.snackBar)) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, employeeForm);
      this.snackBar.open('Employee Updated Successfully', 'Dismiss', {
        duration: 3000,
      });
      this.closeEmployeeForm();
    }
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }

  openAddEmployeeForm(): void {
    this.isEditMode = true;
    getElement('employeeFormContainer').style.display = "block";

  }

  openEmployeeDetailsForm(selectedEmployee: Employee): void {
    this.isDetailsForm = true;
    this.selectedEmployee = selectedEmployee;
    this.populateEditEmpDetailsForm(selectedEmployee);
  }

  populateEditEmpDetailsForm(selectedEmployee: Employee) {
    getElement("buttonSubmit").style.display = "none";
    getElement("buttonSubmit").disabled = true;
    getElement('employeeFormContainer').style.display = "block";
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

  closeEmployeeForm() {
    this.employeeForm.reset();
    this.isDetailsForm = false;
    this.isEditMode = false;
    getElement("buttonSubmit").style.display = "inline-block";
    getElement("buttonSubmit").disabled = false;
    getElement("employeeFormContainer").style.display = "none";
  }

  deleteEmployee() {
    this.dialog.open(ConfirmdialogComponent, {
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete employee?' }
    }).afterClosed().subscribe(result => {
      if (result == true) {
        this.employeeService.deleteEmployee(this.selectedEmployee.id);
        this.snackBar.open('Employee Deleted', 'Dismiss', { duration: 3000, });
        this.closeEmployeeForm();
      }
    });
  }
}
