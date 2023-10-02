import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isFormValid } from '../helper/form-helper';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MasterData } from 'src/app/models/masterdata';
import { MasterDataService } from 'src/app/services/master-data.service';
import { SharedService } from 'src/app/services/shared.service';

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
  @Output()
  closeForm = new EventEmitter<any>();

  masterData: MasterData = {
    departments: [],
    offices: [],
    jobTitles: []
  };

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private masterDataService: MasterDataService,
    private sharedService: SharedService
  ) { }

  employee: Employee = new Employee();

  ngOnInit() {
    if (this.selectedEmployee) {
      Object.assign(this.employee, this.selectedEmployee);
    }
    this.masterData = this.masterDataService.masterData;
  }

  addEmployee() {
    if (isFormValid(this.employee, this.snackBar)) {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.getUpdatedEmployeesData();
        this.snackBar.open('Employee Added Successfully', 'Dismiss', {
          duration: 3000,
        });
      });
      this.closeEmployeeForm();
    }
  }

  updateEmployee(): void {
    if (isFormValid(this.employee, this.snackBar)) {
      // this.employee.empId = this.selectedEmployee.empId;
      this.employeeService.updateEmployee(this.selectedEmployee.empId, this.employee).subscribe(() => {
        this.getUpdatedEmployeesData();
        this.snackBar.open('Employee Updated Successfully', 'Dismiss', {
          duration: 3000,
        });
      });
      this.closeEmployeeForm();
    }
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }

  closeEmployeeForm() {
    this.employee = new Employee();
    this.isDetailsForm = false;
    this.isEditMode = false;
    this.closeForm.emit(false);
  }

  deleteEmployee() {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete employee?' }
    }).afterClosed().subscribe(result => {
      if (result == true) {
        this.employeeService.deleteEmployee(this.selectedEmployee.empId).subscribe(() => {
          this.getUpdatedEmployeesData();
          this.snackBar.open('Employee Deleted', 'Dismiss', { duration: 3000, });
        });
        this.closeEmployeeForm();
      }
    });
  }

  getUpdatedEmployeesData() {
    this.employeeService.getEmployees().subscribe(resp => {
      this.sharedService.updateChanges(resp.data!);
    });
  }
}
