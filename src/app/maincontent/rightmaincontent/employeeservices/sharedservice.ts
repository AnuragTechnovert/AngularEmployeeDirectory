import { Injectable } from '@angular/core';
import { Employee } from '../variables';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

    employeesData: Employee[] = [];
    filteredData: Employee[] | undefined;
    alphabets: string[] | undefined;
    isEditMode: any = false;
    selectedEmployeeId : any ;
    employeesDataSubject: Subject<Employee[]> = new Subject<Employee[]>();

    constructor() {
        const dataFromLocalStorage = localStorage.getItem('employees');
        if (dataFromLocalStorage) {
            this.employeesData = JSON.parse(dataFromLocalStorage);
        }
        this.filteredData = this.employeesData;
    }

    updateEmployees(employees: Employee[]): void {
        this.employeesDataSubject.next(employees);
      }

}
