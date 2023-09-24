import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { FilterService } from 'src/app/services/filter.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import { MasterData } from 'src/app/models/masterdata';
import { filterOptionsEnum } from 'src/app/enums/filter-options-enum';

@Component({
  selector: 'dashboard-category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.css'],
})
export class CategoryFiltersComponent implements OnInit {
  filters: any;
  masterData:MasterData = {
    departments: [],
    offices: [],
    jobTitles: []
  };
  categoryFilterGroupEnum = filterOptionsEnum;

  constructor(private sharedService: SharedService, private employeeService: EmployeeService,
    private filterService: FilterService, private masterDataService: MasterDataService) {
    this.masterData = this.masterDataService.getMasterData();
  }

  ngOnInit() {
    this.filters = {
      departments: {},
      offices: {},
      jobTitles: {},
    }
    this.sharedService?.getEmployeesDataSubject().subscribe((employees: Employee[]) => {
      this.updateCategoryFilters(employees);
    })
    this.employeeService.getEmployees().subscribe(employees => {
      this.updateCategoryFilters(employees);
    })
  }

  updateCategoryFilters(employees: Employee[]) {
    this.filters.departments = {};
    this.filters.offices = {};
    this.filters.jobTitles = {};
    employees.forEach(emp => {
      this.filters.departments[emp.deptId] = (this.filters.departments[emp.deptId] || 0) + 1;
      this.filters.offices[emp.officeId] = (this.filters.offices[emp.officeId] || 0) + 1;
      this.filters.jobTitles[emp.jobId] = (this.filters.jobTitles[emp.jobId] || 0) + 1;
    });
  }

  loadCardsByCategoryFilter = (filterGroupId: number, filterTypeId: number): void => {
    this.filterService.categoryFilter(filterGroupId, filterTypeId);
  }
}
