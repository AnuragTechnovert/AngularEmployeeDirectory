import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from '../rightmaincontent/variables';
import { SharedService } from '../../common/employeeservices/sharedservice';
import { EmployeeService } from '../../common/employeeservices/employeeservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidefilters',
  templateUrl: './sidefilters.component.html',
  styleUrls: ['./sidefilters.component.css'],
})
export class SidefiltersComponent implements OnInit {
  employeeService: EmployeeService | undefined;
  sharedService: SharedService | undefined;
  officeList: any;
  departmentList: any;
  jobtitleList: any;
  filters: any;
  filtersGroups: any[] | undefined

  constructor(sharedService: SharedService, employeeService: EmployeeService) {
    this.sharedService = sharedService;
    this.employeeService = employeeService;
  }

  ngOnInit() {
    this.filters = {
      departments: {},
      offices: {},
      jobtitles: {},
    }
     
    this.sharedService?.employeesDataSubject.subscribe((employees: Employee[]) => {
      this.updateFilters(employees);
    });

    this.updateFilters(this.sharedService!.employeesData);
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

    this.filtersGroups = [
      {
        title: 'Departments',
        filterType: 'department',
        items: this.getFilterItems(this.departmentList, 'departments')
      },
      {
        title: 'Offices',
        filterType: 'office',
        items: this.getFilterItems(this.officeList, 'offices')
      },
      {
        title: 'Job Titles',
        filterType: 'jobTitle',
        items: this.getFilterItems(this.jobtitleList, 'jobtitles')
      }
    ];
  }

  private getFilterItems(list: any[], filterType: string): any[] {
    return list.map(item => ({ key: item, value: this.filters[filterType][item] }));
  }

  loadCardsByFilter = (filterGroup: any, filterType: any): void => {
    let filteredData: Employee[] | undefined;
    switch (filterGroup) {
      case "department":
        filteredData = this.sharedService!.employeesData.filter(emp => emp.department === filterType);
        break;
      case "office":
        filteredData = this.sharedService!.employeesData.filter(emp => emp.office === filterType);
        break;
      case "jobTitle":
        filteredData = this.sharedService!.employeesData.filter(emp => emp.jobTitle === filterType);
        break;
      default:
        filteredData = this.sharedService!.employeesData;
    }

    this.sharedService!.filteredData = filteredData;
  }
}
