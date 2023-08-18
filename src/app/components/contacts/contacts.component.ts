import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/modals/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeformComponent } from '../employeeform/employeeform.component';
import { alphabets } from './varibles';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  alphabets: string[];
  searchQuery: string = '';
  filterValue: string = 'preferredname';
  employees!: Employee[];
  @Input()
  employeeForm!: EmployeeformComponent;

  constructor(private employeeService: EmployeeService, private filterService: FilterService, private sharedService:SharedService) {
    this.alphabets = alphabets;
  }

  ngOnInit(): void {
    this.filterService.filteredEmployeesSubject.subscribe(filteredEmployees => {
      this.loadEmployeesCards(filteredEmployees);
    })
    this.sharedService.employeesDataSubject.subscribe(employees => {
      this.loadEmployeesCards(employees);
    })


    this.loadEmployeesCards(this.employeeService.getEmployees());
  }

  loadEmployeesCards(employees: Employee[]) {
    this.employees = employees;
  }

  openAddEmployeeForm(): void {
    this.employeeForm.openAddEmployeeForm();
  }

  openEmployeeDetails(selectedEmployee: Employee): void {
    this.employeeForm.openEmployeeDetailsForm(selectedEmployee);
  }

  searchByAlphabet(alphabet: string): void {
    this.filterService.alphabetFilter(alphabet);
  }

  search(): void {
    this.filterService.searchFilter(this.filterValue, this.searchQuery);
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.filterValue = 'preferredname';
    this.filterService.resetFilter();
  }

}

