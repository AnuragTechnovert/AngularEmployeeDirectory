import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { MasterDataService } from './master-data.service';
import { filterOptionsEnum } from '../enums/filter-options-enum';
import { SharedService } from './shared.service';

@Injectable()
export class FilterService {
  filteredEmployeesSubject: Subject<Employee[]>;

  filters = {
    deptId: null as number | null,
    officeId: null as number | null,
    jobId: null as number | null,
    alphabet: null as string | null,
    search: null as string | null,
    filterById: null as number | null
  };

  constructor(private employeeService: EmployeeService, private masterDataService: MasterDataService, private sharedService: SharedService) {
    this.filteredEmployeesSubject = new Subject<Employee[]>();
  }

  categoryFilter(filterGroupId: number, filterTypeId: number | null): void {
    switch (filterGroupId) {
      case filterOptionsEnum.Department:
        this.filters.deptId = filterTypeId;
        break;
      case filterOptionsEnum.Office:
        this.filters.officeId = filterTypeId;
        break;
      case filterOptionsEnum.JobTitle:
        this.filters.jobId = filterTypeId;
        break;
    }
    this.filterEmployees();
  }

  alphabetFilter(data: string): void {
    this.filters.alphabet = data;
    this.filterEmployees();
  }

  searchFilter(filterId: number, searchQuery: string): void {
    this.filters.search = searchQuery;
    this.filters.filterById = filterId;
    this.filterEmployees();
  }

  filterEmployees() {
    let filteredEmployees: Employee[] = [];
    this.employeeService.getEmployees().subscribe(resp => {
      filteredEmployees = resp.data!;
      if (this.filters.deptId) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.deptId == this.filters.deptId
        );
      }

      if (this.filters.officeId) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.officeId == this.filters.officeId
        );
      }

      if (this.filters.jobId) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.jobId == this.filters.jobId
        );
      }

      if (this.filters.alphabet) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.firstName.toLowerCase().startsWith(this.filters.alphabet!.toLowerCase())
        );
      }

      if (this.filters.search) {
        let masterData = this.masterDataService.masterData;
        switch (parseInt(this.filters.filterById!.toString())) {
          case filterOptionsEnum.PreferredName:
            filteredEmployees = filteredEmployees.filter((emp) => emp.preferredName.toLowerCase().includes(this.filters.search!.toLowerCase()));
            break;
          case filterOptionsEnum.Department:
            filteredEmployees = filteredEmployees.filter((emp) => emp.deptId === masterData.departments.find(
              (dept: any) => dept.deptName.toLowerCase().includes(this.filters.search!.toLowerCase()))?.deptId
            );
            break;
          case filterOptionsEnum.Office:
            filteredEmployees = filteredEmployees.filter((emp) => emp.officeId === masterData.offices.find(
              (office: any) => office.officeName.toLowerCase().includes(this.filters.search!.toLowerCase()))?.officeId
            );
            break;
          case filterOptionsEnum.JobTitle:
            filteredEmployees = filteredEmployees.filter((emp) => emp.jobId === masterData.jobTitles.find(
              (job: any) => job.jobTitleName.toLowerCase().includes(this.filters.search!.toLowerCase()))?.jobId
            );
            break;
          default:
            console.log(typeof this.filters.filterById);
        }
      }
      this.filteredEmployeesSubject.next(filteredEmployees);
    });
  }

  resetFilter() {
    this.filters = {
      deptId: null as number | null,
      officeId: null as number | null,
      jobId: null as number | null,
      alphabet: null as string | null,
      search: null as string | null,
      filterById: null as number | null
    };
    this.employeeService.getEmployees().subscribe(resp => {
      this.filteredEmployeesSubject.next(resp.data!);
      this.sharedService.updateChanges(resp.data!);
    })
  }
}

