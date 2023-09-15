import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { alphabet, departments, jobTitles, offices, search, filterType } from './filter-variables';
import { MasterDataService } from './master-data.service';

enum filterOptions {
  PreferredName,
  Department,
  Office,
  JobTitle
}

@Injectable()
export class FilterService {

  filteredEmployeesSubject: Subject<Employee[]>;

  constructor(private employeeService: EmployeeService, private masterData: MasterDataService) {
    this.filteredEmployeesSubject = new Subject<Employee[]>();
  }

  categoryFilter(filterGroupId: number, filterTypeId: number): void {
    let filteredEmployees: Employee[] = [];
    this.employeeService.getEmployees().subscribe(employees => {
      switch (filterGroupId) {
        case filterOptions.Department:
          filteredEmployees = employees.filter(emp => emp.deptId === filterTypeId);
          break;
        case filterOptions.Office:
          filteredEmployees = employees.filter(emp => emp.officeId === filterTypeId);
          break;
        case filterOptions.JobTitle:
          filteredEmployees = employees.filter(emp => emp.jobId === filterTypeId);
          break;
      }
      this.filteredEmployeesSubject.next(filteredEmployees);
    });
  }

  alphabetFilter(data: string): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.filteredEmployeesSubject.next(employees.filter(emp => emp.firstName.toLowerCase().startsWith(data.toLowerCase())));
    })
  }

  searchFilter(filterId: number, searchQuery: string): void {
    let filteredEmployees: Employee[] = [];
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        switch (filterId) {
          case filterOptions.PreferredName:
            filteredEmployees = employees.filter((emp) =>
              emp.preferredName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;

          case filterOptions.Department:
            filteredEmployees = employees.filter((emp) =>
              emp.deptId === this.masterData.departments.find(
                (dept) =>
                  dept.deptName.toLowerCase() === searchQuery.toLowerCase()
              )?.deptId
            );
            break;

          case filterOptions.Office:
            filteredEmployees = employees.filter((emp) =>
              emp.officeId === this.masterData.offices.find(
                (office) =>
                  office.officeName.toLowerCase() === searchQuery.toLowerCase()
              )?.officeId
            );
            break;
          case filterOptions.JobTitle:
            filteredEmployees = employees.filter((emp) =>
              emp.jobId === this.masterData.jobTitles.find(
                (job) =>
                  job.jobTitleName.toLowerCase() === searchQuery.toLowerCase()
              )?.jobId
            );
            break;
        }
        this.filteredEmployeesSubject.next(filteredEmployees);
      });
  }

  // updateFilteredEmployees() {
  //   let filteredEmployees: Employee[] = [];
  //   this.employeeService.getEmployees().subscribe(resp => {
  //     filteredEmployees = resp;

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
  //   });
  // }

  resetFilter() {
    this.employeeService.getEmployees().subscribe(resp => {
      this.filteredEmployeesSubject.next(resp);
    })
  }
}

