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

  constructor(sharedService: SharedService, employeeService: EmployeeService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.employeeService = employeeService;
    this.sharedService = sharedService;
  }

  addEmployee(employeeForm: NgForm) {
    let employee = Object.assign({}, employeeForm.value);
    if (isFormValid(employee, this.snackBar)) {
      employee.id = new Date().getTime();
      this.employeeService.addEmployee(employee);
      this.snackBar.open('Employee Added Successfully', 'Dismiss', {
        duration: 3000,
      });
      this.closeEmployeeForm();
    }
  }

  updateEmployee(employeeForm: NgForm): void {
    let employee = Object.assign({}, employeeForm.value);
    if (isFormValid(employee, this.snackBar)) {
      employee.id = this.selectedEmployee.id;
      this.employeeService.updateEmployee(this.selectedEmployee.id, employee);
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
    getElement('employeeFormContainer').style.display = "block";
    this.employeeForm.control.patchValue(selectedEmployee);
  }

  closeEmployeeForm() {
    getElement("employeeFormContainer").style.display = "none";
    this.employeeForm.reset();
    this.isDetailsForm = false;
    this.isEditMode = false;
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
