import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from '../rightmaincontent/variables';
import { getElement } from '../rightmaincontent/helper';
import { SharedVaribleService } from '../rightmaincontent/employeeservices/variblesservice';
import { EmployeeFormService } from '../rightmaincontent/employeeservices/employeeformservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidefilters',
  templateUrl: './sidefilters.component.html',
  styleUrls: ['./sidefilters.component.css'],
})
export class SidefiltersComponent implements OnInit {
  employeeFormServiceRef: EmployeeFormService | undefined;
  sharedVaribleServiceRef: SharedVaribleService | undefined;
  officeList: any;
  departmentList: any;
  jobtitleList: any;
  filters: any;

  constructor(sharedVaribleServiceRef: SharedVaribleService, employeeFormServiceRef: EmployeeFormService) {
    this.sharedVaribleServiceRef = sharedVaribleServiceRef;
    this.employeeFormServiceRef = employeeFormServiceRef;
  }

  ngOnInit() {
    this.filters = {
      departments: {},
      offices: {},
      jobtitles: {},
    }
    this.sharedVaribleServiceRef?.employeesDataSubject.subscribe((employees: Employee[]) => {
      this.updateFilters(employees);
    });

    this.updateFilters(this.sharedVaribleServiceRef!.employeesData);
  }

  updateFilters(employees: Employee[]) {
    this.filters.departments = {};
    this.filters.offices = {};
    this.filters.jobtitles = {};

    employees.forEach(emp => {
      this.filters.departments[emp.department] = (this.filters.departments[emp.department] || 0) + 1;
      this.filters.offices[emp.office] = (this.filters.offices[emp.office] || 0) + 1;
      this.filters.jobtitles[emp.jobTitle] = (this.filters.jobtitles[emp.jobTitle] || 0) + 1;
    })

    this.departmentList = Object.keys(this.filters.departments);
    this.officeList = Object.keys(this.filters.offices);
    this.jobtitleList = Object.keys(this.filters.jobtitles);
  }

  loadCardsByFilter = (filterGroup: any, filterType: any): void => {
    let filteredData: Employee[] | undefined;
    switch (filterGroup) {
      case "department":
        filteredData = this.sharedVaribleServiceRef!.employeesData.filter(emp => emp.department === filterType);
        break;
      case "office":
        filteredData = this.sharedVaribleServiceRef!.employeesData.filter(emp => emp.office === filterType);
        break;
      case "jobTitle":
        filteredData = this.sharedVaribleServiceRef!.employeesData.filter(emp => emp.jobTitle === filterType);
        break;
      default:
        filteredData = this.sharedVaribleServiceRef!.employeesData;
    }

    this.sharedVaribleServiceRef!.filteredData = filteredData;
  }
}
