import { Component, ViewEncapsulation } from '@angular/core';
import { Employee } from '../rightmaincontent/variables';
import { getElement } from '../rightmaincontent/helper';
import { SharedVaribleService } from '../rightmaincontent/employeeservices/variblesservice';
import { EmployeeFormService } from '../rightmaincontent/employeeservices/employee-formservice';

@Component({
  selector: 'app-sidefilters',
  templateUrl: './sidefilters.component.html',
  styleUrls: ['./sidefilters.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class SidefiltersComponent {
  employeesData: Employee[] = [];
  filteredData: Employee[] | undefined;
  employeeFormServiceRef: EmployeeFormService | undefined;
  officeList : any;
  departmentList: any;
  jobtitleList:any;

  filters: any = {
    departments: {},
    offices: {},
    jobtitles: {}
  }

  constructor(sharedVaribleService: SharedVaribleService, employeeFormServiceRef: EmployeeFormService) {
    const dataFromLocalStorage = localStorage.getItem('employees');
    this.employeeFormServiceRef = employeeFormServiceRef;
    if (dataFromLocalStorage) {
      this.employeesData = JSON.parse(dataFromLocalStorage);
    }
  }

  ngOnInit() {

    this.employeesData.forEach(emp => {
      this.filters.departments[emp.department] = (this.filters.departments[emp.department] || 0) + 1;
      this.filters.offices[emp.office] = (this.filters.offices[emp.office] || 0) + 1;
      this.filters.jobtitles[emp.jobTitle] = (this.filters.jobtitles[emp.jobTitle] || 0) + 1;
    })

    this.departmentList = Object.keys(this.filters.departments);

    this.officeList = Object.keys(this.filters.offices);

    this.jobtitleList = Object.keys(this.filters.jobtitles);
  }

  loadCardsByFilter = (filterGroup: any, filterType: any): void => {
    switch (filterGroup) {
      case "department":
        this.filteredData = this.employeesData.filter(emp => emp.department === filterType);
        break;
      case "office":
        this.filteredData = this.employeesData.filter(emp => emp.office === filterType);
        break;
      case "jobTitle":
        this.filteredData = this.employeesData.filter(emp => emp.jobTitle === filterType);
        break;
      default:
        this.filteredData = this.employeesData;
    }
    this.employeeFormServiceRef!.loadEmpCards(this.filteredData);
  }
}
