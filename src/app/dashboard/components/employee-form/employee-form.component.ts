import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { isFormValid } from '../helper/helper';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dashboard-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {

  @Input()
  isEditMode: boolean = false;
  @Input()
  isDetailsForm: boolean = false;
  @Input()
  selectedEmployee!: Employee;

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    preferredName: '',
    email: '',
    jobTitle: '',
    office: '',
    department: '',
    phoneNumber: '',
    skypeId: '',
  }

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.selectedEmployee) {
      Object.assign(this.employee, this.selectedEmployee);
    }
  }

  addEmployee() {
    if (isFormValid(this.employee, this.snackBar)) {
      this.employeeService.addEmployee(this.employee);
      this.snackBar.open('Employee Added Successfully', 'Dismiss', {
        duration: 3000,
      });
      this.closeEmployeeForm();
    }
  }
  
  updateEmployee(): void {
    if (isFormValid(this.employee, this.snackBar)) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.employee);
      this.snackBar.open('Employee Updated Successfully', 'Dismiss', {
        duration: 3000,
      });
      this.closeEmployeeForm();
    }
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }

  closeEmployeeForm() {

    this.employee = {
      id: 0,
      firstName: '',
      lastName: '',
      preferredName: '',
      email: '',
      jobTitle: '',
      office: '',
      department: '',
      phoneNumber: '',
      skypeId: '',
    }
    this.isDetailsForm = false;
    this.isEditMode = false;
   // this.router.navigate(['']);
  }

  deleteEmployee() {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete employee?' }
    }).afterClosed().subscribe(result => {
      if (result == true) {
        console.log(this.selectedEmployee.id);
        this.employeeService.deleteEmployee(this.selectedEmployee.id);
        this.snackBar.open('Employee Deleted', 'Dismiss', { duration: 3000, });
        this.closeEmployeeForm();
      }
    });
  }
}
