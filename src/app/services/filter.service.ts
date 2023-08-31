import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { alphabet, departments, jobTitles, offices, search, filterType } from './filter-variables';

@Injectable()
export class FilterService {

  filteredEmployeesSubject: Subject<Employee[]>;

  constructor(private employeeService: EmployeeService) {

    this.filteredEmployeesSubject = new Subject<Employee[]>();
  }

  categoryFilter(filterGroup: any, filterType: any): void {

    switch (filterGroup) {
      case "department":
        departments.pop();
        departments.push(filterType);
        break;
      case "office":
        offices.pop();
        offices.push(filterType);
        break;
      case "jobTitle":
        jobTitles.pop();
        jobTitles.push(filterType);
        break;
    }

    this.updateFilteredEmployees();
  }

  alphabetFilter(data: string): void {
    if (alphabet.length > 0) {
      alphabet.pop();
    }
    alphabet.push(data);
    this.updateFilteredEmployees();
  }

  searchFilter(FilterBy: String, searchQuery: String): void {
    search.pop();
    search.push(searchQuery);
    filterType.pop();
    filterType.push(FilterBy);
    this.updateFilteredEmployees();
  }

  updateFilteredEmployees() {
    let filteredEmployees = this.employeeService.getEmployees();
  
    if (departments.length > 0) {
      filteredEmployees = filteredEmployees.filter(emp => emp.department === departments[0]);
    }
    if (offices.length > 0) {
      filteredEmployees = filteredEmployees.filter(emp => emp.office === offices[0]);
    }
    if (jobTitles.length > 0) {
      filteredEmployees = filteredEmployees.filter(emp => emp.jobTitle === jobTitles[0]);
    }
    if (alphabet.length > 0) {
      filteredEmployees = filteredEmployees.filter(emp => emp.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase()));
    }
    if (search.length > 0 && filterType.length > 0) {
      switch (filterType[0]) {
        case "preferredname":
          filteredEmployees = filteredEmployees.filter(emp => emp.preferredName.toLowerCase().includes(search[0].toLowerCase()));
          break;
        case "department":
          filteredEmployees = filteredEmployees.filter(emp => emp.department.toLowerCase().includes(search[0].toLowerCase()));
          break;
        case "office":
          filteredEmployees = filteredEmployees.filter(emp => emp.office.toLowerCase().includes(search[0].toLowerCase()));
          break;
        case "jobtitle":
          filteredEmployees = filteredEmployees.filter(emp => emp.jobTitle.toLowerCase().includes(search[0].toLowerCase()));
          break;
      }
    }
  
    this.filteredEmployeesSubject.next(filteredEmployees);
  }

  resetFilter() {
    departments.length = 0;
    jobTitles.length = 0;
    offices.length = 0;
    alphabet.length = 0;
    search.length = 0;
    this.filteredEmployeesSubject.next(this.employeeService.getEmployees());
  }

}

