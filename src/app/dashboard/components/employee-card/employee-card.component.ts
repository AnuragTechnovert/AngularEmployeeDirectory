import { Component, Input } from '@angular/core';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { JobTitle } from 'src/app/models/jobtitle';
import { MasterData } from 'src/app/models/masterdata';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'dashboard-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input()
  employee!: Employee;
  masterData:MasterData;
  constructor(private masterDataService:MasterDataService) { 
    this.masterData = this.masterDataService.masterData;
  }

  getJobTitleNameById(jobId: number): string | undefined {
    const jobTitle = this.masterData.jobTitles.find((data: JobTitle) => data.jobId === jobId);
    return jobTitle ? jobTitle.jobTitleName : undefined;
  }

  getDeptNameById(deptId: number): string | undefined {
    const department = this.masterData.departments.find((data: Department) => data.deptId === deptId);
    return department ? department.deptName : undefined;
  }
}
