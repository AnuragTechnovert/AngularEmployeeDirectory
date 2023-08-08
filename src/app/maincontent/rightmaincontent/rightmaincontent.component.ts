import { Component } from '@angular/core';
import { Employee, alphabets } from './variables';
import { getElement } from './helper';
import { SharedService } from '../../common/employeeservices/sharedservice';
import { EmployeeService } from '../../common/employeeservices/employeeservice';

@Component({
  selector: 'app-rightmaincontent',
  templateUrl: './rightmaincontent.component.html',
  styleUrls: ['./rightmaincontent.component.css']
})

export class RightmaincontentComponent {

  alphabets: string[] | undefined;
  sharedService: any;
  selectedEmployee: Employee | undefined;
  employeeService: EmployeeService | undefined;
  searchQuery: string = '';
  filterValue: string = 'preferredname';

  constructor(sharedService: SharedService, employeeService: EmployeeService) {
    this.sharedService = sharedService;
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
    if (this.sharedService.filteredData)
      this.sharedService.filteredData = this.sharedService.employeesData!.filter((emp: any) => { return emp.firstName.toLowerCase().startsWith(alphabet.toLowerCase()) });
    
  }

  search (): void {
    let filterValue = this.filterValue;
    let searchValue = this.searchQuery.toLowerCase();

    switch (filterValue) {
      case "preferredname":
        this.sharedService.filteredData = this.sharedService.employeesData.filter((emp: any) => emp.preferredName.toLowerCase().includes(searchValue));
        break;
      case "department":
        this.sharedService.filteredData = this.sharedService.employeesData.filter((emp: any) => emp.department.toLowerCase().includes(searchValue));
        break;
      case "office":
        this.sharedService.filteredData = this.sharedService.employeesData.filter((emp: any) => emp.office.toLowerCase().includes(searchValue));
        break;
      case "jobtitle":
        this.sharedService.filteredData = this.sharedService.employeesData.filter((emp: any) => emp.jobTitle.toLowerCase().includes(searchValue));
        break;
      default:
        this.sharedService.filteredData = this.sharedService.employeesData;
        break;
    }
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.filterValue = 'preferredname';
    this.sharedService.filteredData = this.sharedService.employeesData;
  }
}

