import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'dashboard-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  isOpenForm: boolean = false;
  selectedEmployee!: Employee;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private filterService: FilterService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.filterService.filteredEmployeesSubject.subscribe(filteredEmployees => {
      this.employees = filteredEmployees;
    })
    this.sharedService.getEmployeesDataSubject().subscribe(employees => {
      this.employees = employees;
    })
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    })
  }

  openEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isOpenForm = !this.isOpenForm;
  }

  closeForm(data:any){
    this.isOpenForm = data;
  }
}

