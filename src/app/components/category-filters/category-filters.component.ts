import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.css'],
})
export class CategoryFiltersComponent implements OnInit {

  officeList: any;
  departmentList: any;
  jobtitleList: any;
  filters: any;
  filtersGroups: any[] | undefined

  constructor(private sharedService: SharedService, private employeeService: EmployeeService, private filterService: FilterService , private router : Router) {
  }

  ngOnInit() {
    this.filters = {
      departments: {},
      offices: {},
      jobtitles: {},
    }

    this.sharedService?.employeesDataSubject.subscribe((employees: Employee[]) => {
      this.updateCategoryFilters(employees);
    });

    this.updateCategoryFilters(this.employeeService.getEmployees());
  }

  updateCategoryFilters(employees: Employee[]) {
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

  loadCardsByFilter = (filterGroup: string, filterType: string): void => {
    this.router.navigate(
      ['/employees'], 
      { queryParams: { [filterGroup]: filterType } }
  ); 
    this.filterService.leftFilter(filterGroup, filterType);
  }
}
