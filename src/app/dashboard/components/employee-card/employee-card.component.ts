import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Departments } from 'src/app/models/departments';
import { Employee } from 'src/app/models/employee';
import { JobTitles } from 'src/app/models/jobtitles';
import { Offices } from 'src/app/models/offices';
import { EmployeeService } from 'src/app/services/employee.service';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'dashboard-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input()
  employee!: Employee;

  departments: Departments[] = [];
  jobTitles: JobTitles[] = [];
  offices: Offices[] = [];

  constructor(private employeeService: EmployeeService, private masterData: MasterDataService) {
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

   getJobTitleNameById(jobId: number): string|undefined{
    const jobTitle = this.jobTitles.find((data) => data.jobId === jobId);
    return jobTitle ? jobTitle.jobTitleName : undefined;
  }

   getDeptNameById(deptId: number): string|undefined{
    const department = this.departments.find((data) => data.deptId === deptId);
    return department ? department.deptName : undefined;
  }

}
