// departments.service.ts
import { Injectable,OnInit } from '@angular/core';
import { Departments } from '../models/departments';
import { JobTitles } from '../models/jobtitles';
import { Offices } from '../models/offices';
import { EmployeeService } from './employee.service';

enum categoryFilterGroup {
  Departments,
  Offices,
  JobTitles,
}

@Injectable({
  providedIn: 'root', 
})
export class MasterDataService {
  departments: Departments[] = [];
  jobTitles: JobTitles[] = [];
  offices: Offices[] = [];

  constructor(private employeeService: EmployeeService) {
    this.employeeService.getDepartments().subscribe(resp => {
      this.departments = resp;
      localStorage.setItem(`${categoryFilterGroup.Departments}`,JSON.stringify(this.departments));
    });
    this.employeeService.getJobTitles().subscribe(resp => {
      this.jobTitles = resp;
      localStorage.setItem(`${categoryFilterGroup.JobTitles}`,JSON.stringify(this.jobTitles));
    });
    this.employeeService.getOffices().subscribe(resp => {
      this.offices = resp;
      localStorage.setItem(`${categoryFilterGroup.Offices}`,JSON.stringify(this.offices));
    }); 

  }
  
}
