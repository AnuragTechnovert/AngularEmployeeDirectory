import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { alphabets } from './varibles';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  alphabets: string[];
  searchQuery: string = '';
  filterValue: string = 'preferredname';
  isOpenForm: boolean = false;
  selectedEmployee!: Employee;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private filterService: FilterService, private sharedService: SharedService, private router: Router) {
    this.alphabets = alphabets;

  }

  ngOnInit(): void {
    this.filterService.filteredEmployeesSubject.subscribe(filteredEmployees => {
      this.employees = filteredEmployees;
    })
    this.sharedService.getEmployeesDataSubject().subscribe(employees => {
      this.employees = employees;
    })
    this.employeeService.getEmployees().subscribe(resp => {
      this.employees = resp;
    })
  }

  openEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isOpenForm = !this.isOpenForm;
  }
}

