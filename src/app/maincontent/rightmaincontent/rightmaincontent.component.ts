import { Component, OnInit } from '@angular/core';
import { Employee, alphabets } from './variables';
import { getElement} from './helper';
import { SharedVaribleService } from './employeeservices/variblesservice';
import { EmployeeFormService } from './employeeservices/employee-formservice';

@Component({
  selector: 'app-rightmaincontent',
  templateUrl: './rightmaincontent.component.html',
  styleUrls: ['./rightmaincontent.component.css']
})

export class RightmaincontentComponent{

  employeesData : Employee[] | undefined;
  alphabets: string[] | undefined;
  sharedVaribleServiceRef: any;
  selectedEmployee: Employee | undefined;
  employeeFormServiceRef: EmployeeFormService | undefined;


  constructor(sharedVaribleServiceRef: SharedVaribleService, employeeFormServiceRef: EmployeeFormService) {
    this.sharedVaribleServiceRef = sharedVaribleServiceRef;
    const dataFromLocalStorage = localStorage.getItem('employees');
    this.employeeFormServiceRef = employeeFormServiceRef;
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

  searchByAlphabet = (alphabet: string): void => {
    if (this.sharedVaribleServiceRef.filteredData) {
      this.sharedVaribleServiceRef.filteredData = this.sharedVaribleServiceRef.filteredData!.filter((emp:any) => { return emp.firstName.toLowerCase().startsWith(alphabet.toLowerCase()) })
      this.employeeFormServiceRef!.loadEmpCards(this.sharedVaribleServiceRef.filteredData);
    }
    else {
      let empdata: any[] = [];
      empdata = this.sharedVaribleServiceRef.employeesData.filter((emp:any) => { return emp.firstName.toLowerCase().startsWith(alphabet.toLowerCase()) });
      this.employeeFormServiceRef!.loadEmpCards(empdata);
    }
  }

  searchQuery: string = '';
  filterValue: string = 'preferredname';

  search = (): void => {
    let filterValue = this.filterValue;
    let searchValue = this.searchQuery.toLowerCase();

    switch (filterValue) {
      case "preferredname":
        this.sharedVaribleServiceRef.filteredData = this.sharedVaribleServiceRef.employeesData.filter((emp:any) => emp.preferredName.toLowerCase().includes(searchValue));
        break;
      case "department":
        this.sharedVaribleServiceRef.filteredData = this.sharedVaribleServiceRef.employeesData.filter((emp:any) => emp.department.toLowerCase().includes(searchValue));
        break;
      case "office":
        this.sharedVaribleServiceRef.filteredData = this.sharedVaribleServiceRef.employeesData.filter((emp:any) => emp.office.toLowerCase().includes(searchValue));
        break;
      case "jobtitle":
        this.sharedVaribleServiceRef.filteredData = this.sharedVaribleServiceRef.employeesData.filter((emp:any) => emp.jobTitle.toLowerCase().includes(searchValue));
        break;
      default:
        this.sharedVaribleServiceRef.filteredData = this.sharedVaribleServiceRef.employeesData;
        break;
    }

    this.employeeFormServiceRef!.loadEmpCards(this.sharedVaribleServiceRef.filteredData);
  }

  cardsContainerReset = () => {
    console.log("clear method run");
    //this.employeeFormServiceRef!.loadEmpCards(this.sharedVaribleServiceRef.employeesData);
     this.employeesData = this.sharedVaribleServiceRef.employeesData;
    this.sharedVaribleServiceRef.filteredData = [];
  }
}

