import { Component, Input, OnInit } from '@angular/core';
import { isFormValid } from '../helper/helper';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Departments } from 'src/app/models/departments';
import { JobTitles } from 'src/app/models/jobtitles';
import { Offices } from 'src/app/models/offices';
import { MasterDataService } from 'src/app/services/master-data.service';

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

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  departments: Departments[] = [];
  jobTitles: JobTitles[] = [];
  offices: Offices[] = [];

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    preferredName: '',
    email: '',
    jobId: 0,
    officeId: 0,
    deptId: 0,
    phoneNumber: '',
    skypeId: '',
  }

  ngOnInit() {
    if (this.selectedEmployee) {
      Object.assign(this.employee, this.selectedEmployee);
    }

    this.employeeService.getDepartments().subscribe(resp => {
      this.departments = resp;
    });
    this.employeeService.getJobTitles().subscribe(resp => {
      this.jobTitles = resp;
    });
    this.employeeService.getOffices().subscribe(resp => {
      this.offices = resp;
    });
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
      jobId: 0,
      officeId: 0,
      deptId: 0,
      phoneNumber: '',
      skypeId: '',
    }
    this.isDetailsForm = false;
    this.isEditMode = false;
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
