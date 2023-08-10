import { Component, ViewChild } from '@angular/core';
import { SharedService } from '../../services/datasharedservice';
import { Employee } from 'src/app/modals/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeformComponent } from '../employeeform/employeeform.component';
import { alphabets } from './varibles';

@Component({
  selector: 'app-rightmaincontent',
  templateUrl: './rightmaincontent.component.html',
  styleUrls: ['./rightmaincontent.component.css']
})

export class RightmaincontentComponent {

  alphabets: string[];
  sharedService: SharedService;
  employeeService: EmployeeService;
  searchQuery: string = '';
  filterValue: string = 'preferredname';

  @ViewChild(EmployeeformComponent)
  employeeForm!: EmployeeformComponent;

  constructor(sharedService: SharedService, employeeService: EmployeeService) {
    this.sharedService = sharedService;
    this.employeeService = employeeService;
    this.alphabets = alphabets;
  }

  openAddEmployeeForm(): void {
    this.employeeForm.openAddEmployeeForm();
  }

  openEmployeeDetails(selectedEmployee: Employee): void {
    this.employeeForm.openEmployeeDetailsForm(selectedEmployee);
  }

  searchByAlphabet(alphabet: string): void {
    if (this.sharedService.filteredData)
      this.sharedService.filteredData = this.sharedService.employeesData!.filter((emp: any) => { return emp.firstName.toLowerCase().startsWith(alphabet.toLowerCase()) });
  }

  search(): void {
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

