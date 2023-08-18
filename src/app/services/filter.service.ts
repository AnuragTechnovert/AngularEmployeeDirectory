import { Injectable } from '@angular/core';
import { Employee } from '../modals/employee';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { alphabet, departments, jobTitles, offices, search, filterType } from './variables';

@Injectable()
export class FilterService {

  filteredEmployeesSubject: Subject<Employee[]>;

  constructor(private employeeService: EmployeeService) {

    this.filteredEmployeesSubject = new Subject<Employee[]>();
  }

  leftFilter(filterGroup: any, filterType: any): void {

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
    console.log(alphabet[0]);
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


    if (jobTitles.length > 0 && offices.length > 0 && departments.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.jobTitle === jobTitles[0] && employee.office === offices[0] && employee.department === departments[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (jobTitles.length > 0 && offices.length > 0 && departments.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.jobTitle === jobTitles[0] && employee.office === offices[0] && employee.department === departments[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (jobTitles.length > 0 && offices.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.jobTitle === jobTitles[0] && employee.office === offices[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (departments.length > 0 && offices.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.department === departments[0] && employee.office === offices[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (departments.length > 0 && jobTitles.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.department === departments[0] && employee.jobTitle === jobTitles[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (jobTitles.length > 0 && offices.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.jobTitle === jobTitles[0] && employee.office === offices[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (departments.length > 0 && offices.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.department === departments[0] && employee.office === offices[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (departments.length > 0 && jobTitles.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.department === departments[0] && employee.jobTitle === jobTitles[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (departments.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.department === departments[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (offices.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.office === offices[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (jobTitles.length > 0 && alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.jobTitle === jobTitles[0] && employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (alphabet.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.firstName.toLowerCase().startsWith(alphabet[0].toLowerCase());
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (departments.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.department === departments[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (offices.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.office === offices[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (jobTitles.length > 0) {
      let filteredEmployees = this.employeeService.getEmployees().filter(employee => {
        return employee.jobTitle === jobTitles[0];
      });
      this.filteredEmployeesSubject.next(filteredEmployees);
      return;
    }

    if (search.length > 0 && filterType.length > 0) {

      let filteredEmployees;

      switch (filterType[0]) {
        case "preferredname":
          filteredEmployees = this.employeeService.getEmployees().filter((emp: any) => emp.preferredName.toLowerCase().includes(search[0].toLowerCase()));
          break;
        case "department":
          filteredEmployees = this.employeeService.getEmployees().filter((emp: any) => emp.department.toLowerCase().includes(search[0].toLowerCase()));
          break;
        case "office":
          filteredEmployees = this.employeeService.getEmployees().filter((emp: any) => emp.office.toLowerCase().includes(search[0].toLowerCase()));
          break;
        case "jobtitle":
          filteredEmployees = this.employeeService.getEmployees().filter((emp: any) => emp.jobTitle.toLowerCase().includes(search[0].toLowerCase()));
          break;
      }
      this.filteredEmployeesSubject.next(filteredEmployees!);
      return;
    }
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

