import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { alphabet, departments, jobTitles, offices, search, filterType } from './filter-variables';

enum categoryFilterGroup {
  Departments,
  Offices,
  JobTitles,
}

@Injectable()
export class FilterService {

  filteredEmployeesSubject: Subject<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    this.filteredEmployeesSubject = new Subject<Employee[]>();
  }

  categoryFilter(filterGroup: number, filterTypeId: number): void {
    let filteredEmployees: Employee[] = [];
    this.employeeService.getEmployees().subscribe(employees => {
      filteredEmployees = employees;
      switch (filterGroup) {
        case categoryFilterGroup.Departments:
          filteredEmployees = filteredEmployees.filter(emp => emp.deptId === filterTypeId);
          break;
        case categoryFilterGroup.Offices:
          filteredEmployees = filteredEmployees.filter(emp => emp.officeId === filterTypeId);
          break;
        case categoryFilterGroup.JobTitles:
          filteredEmployees = filteredEmployees.filter(emp => emp.jobId === filterTypeId);
          break;
      }
    });
    this.filteredEmployeesSubject.next(filteredEmployees);
  }

  alphabetFilter(data: string): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.filteredEmployeesSubject.next(employees.filter(emp => emp.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase())));
    })
  }

  searchFilter(FilterBy: String, searchQuery: String): void {
  }

  updateFilteredEmployees() {
    let filteredEmployees: Employee[] = [];
    this.employeeService.getEmployees().subscribe(resp => {
      filteredEmployees = resp;

      // if (departments.length > 0) {
      //   filteredEmployees = filteredEmployees.filter(emp => emp.department === departments[0]);
      // }
      // if (offices.length > 0) {
      //   filteredEmployees = filteredEmployees.filter(emp => emp.office === offices[0]);
      // }
      // if (jobTitles.length > 0) {
      //   filteredEmployees = filteredEmployees.filter(emp => emp.jobTitle === jobTitles[0]);
      // }
      // if (alphabet.length > 0) {
      //   filteredEmployees = filteredEmployees.filter(emp => emp.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase()));
      // }
      // if (search.length > 0 && filterType.length > 0) {
      //   switch (filterType[0]) {
      //     case "preferredname":
      //       filteredEmployees = filteredEmployees.filter(emp => emp.preferredName.toLowerCase().includes(search[0].toLowerCase()));
      //       break;
      //     case "department":
      //       filteredEmployees = filteredEmployees.filter(emp => emp.department.toLowerCase().includes(search[0].toLowerCase()));
      //       break;
      //     case "office":
      //       filteredEmployees = filteredEmployees.filter(emp => emp.office.toLowerCase().includes(search[0].toLowerCase()));
      //       break;
      //     case "jobtitle":
      //       filteredEmployees = filteredEmployees.filter(emp => emp.jobTitle.toLowerCase().includes(search[0].toLowerCase()));
      //       break;
      //   }
      // }
    });
  }

  resetFilter() {
    this.employeeService.getEmployees().subscribe(resp => {
      this.filteredEmployeesSubject.next(resp);
    })
  }
}

