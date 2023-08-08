import { Component } from '@angular/core';
import { Employee, alphabets } from './variables';
import { getElement } from './helper';
import { SharedService } from './employeeservices/sharedservice';
import { EmployeeService } from './employeeservices/employeeservice';

@Component({
  selector: 'app-rightmaincontent',
  templateUrl: './rightmaincontent.component.html',
  styleUrls: ['./rightmaincontent.component.css']
})

export class RightmaincontentComponent {

  alphabets: string[] | undefined;
  sharedservice: any;
  selectedEmployee: Employee | undefined;
  employeeService: EmployeeService | undefined;
  searchQuery: string = '';
  filterValue: string = 'preferredname';

  constructor(sharedservice: SharedService, employeeService: EmployeeService) {
    this.sharedservice = sharedservice;
    this.employeeService = employeeService;
    this.alphabets = alphabets;
  }

  openDetails = (selectedEmployee: any): void => {
    getElement("overlay").style.display = "block";
    this.selectedEmployee = selectedEmployee;
    let empDetailContainer = getElement('empDetailContainer');
    empDetailContainer.style.display = "block";
  }

  openEmployeeForm(): void {
    document.querySelector(".emp-form-title")!.textContent = "Add Employee";
    getElement("overlay").style.display = "block";
    getElement('userFormContainer').style.display = "block";
  }

  searchByAlphabet (alphabet: string): void {
    if (this.sharedservice.filteredData)
      this.sharedservice.filteredData = this.sharedservice.employeesData!.filter((emp: any) => { return emp.firstName.toLowerCase().startsWith(alphabet.toLowerCase()) });
    
  }

  search (): void {
    let filterValue = this.filterValue;
    let searchValue = this.searchQuery.toLowerCase();

    switch (filterValue) {
      case "preferredname":
        this.sharedservice.filteredData = this.sharedservice.employeesData.filter((emp: any) => emp.preferredName.toLowerCase().includes(searchValue));
        break;
      case "department":
        this.sharedservice.filteredData = this.sharedservice.employeesData.filter((emp: any) => emp.department.toLowerCase().includes(searchValue));
        break;
      case "office":
        this.sharedservice.filteredData = this.sharedservice.employeesData.filter((emp: any) => emp.office.toLowerCase().includes(searchValue));
        break;
      case "jobtitle":
        this.sharedservice.filteredData = this.sharedservice.employeesData.filter((emp: any) => emp.jobTitle.toLowerCase().includes(searchValue));
        break;
      default:
        this.sharedservice.filteredData = this.sharedservice.employeesData;
        break;
    }
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.filterValue = 'preferredname';
    this.sharedservice.filteredData = this.sharedservice.employeesData;
  }
}

