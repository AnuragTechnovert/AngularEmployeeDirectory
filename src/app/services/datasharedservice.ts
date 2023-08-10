import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../modals/employee';
import { EmployeeService } from './employee.service';

@Injectable()
export class SharedService {

    employeesData: Employee[] = [];
    filteredData: Employee[] | undefined;
    employeesDataSubject: Subject<Employee[]>;
    
    constructor() {
        const dataFromLocalStorage = localStorage.getItem('employees');
        if (dataFromLocalStorage) {
            this.employeesData = JSON.parse(dataFromLocalStorage);
        }
        this.filteredData = this.employeesData;
        this.employeesDataSubject = new Subject<Employee[]>();
    }

    updateChanges(employees: Employee[]): void {
        this.filteredData = employees;
        this.employeesDataSubject.next(employees);
      }

}