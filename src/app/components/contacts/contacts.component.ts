import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
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
  employeeFormComponent!: EmployeeFormComponent;

  constructor(private employeeService: EmployeeService, private filterService: FilterService, private sharedService: SharedService) {
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

  openEmployeeDetails(selectedEmployee: Employee): void {
    this.employeeFormComponent.openEmployeeDetailsForm(selectedEmployee);
  }
}

