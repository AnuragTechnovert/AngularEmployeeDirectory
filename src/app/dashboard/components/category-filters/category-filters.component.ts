import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.css'],
})
export class CategoryFiltersComponent implements OnInit {

  filters: any;
  filtersGroups: any[] | undefined

  constructor(private sharedService: SharedService, private employeeService: EmployeeService, private filterService: FilterService, private router: Router) {
  }

  ngOnInit() {
    this.filters = {
      departments: {},
      offices: {},
      jobTitles: {},
    }

    this.sharedService?.employeesDataSubject.subscribe((employees: Employee[]) => {
      this.updateCategoryFilters(employees);
    });

  this.employeeService.getEmployees().subscribe(resp=>{
    this.updateCategoryFilters(resp);
  })
  }

  updateCategoryFilters(employees: Employee[]) {
    this.filters.departments = {};
    this.filters.offices = {};
    this.filters.jobTitles = {};

    employees.forEach(emp => {
      this.filters.departments[emp.department] = (this.filters.departments[emp.department] || 0) + 1;
      this.filters.offices[emp.office] = (this.filters.offices[emp.office] || 0) + 1;
      this.filters.jobTitles[emp.jobTitle] = (this.filters.jobTitles[emp.jobTitle] || 0) + 1;
    })

    this.filtersGroups = [
      {
        title: 'Departments',
        filterType: 'departments',
      },
      {
        title: 'Offices',
        filterType: 'offices',
      },
      {
        title: 'Job Titles',
        filterType: 'jobTitles',
      }
    ];
  }

  loadCardsByCategoryFilter = (filterGroup: any, filterType: any): void => {
    this.filterService.categoryFilter(filterGroup, filterType);
  }
}
