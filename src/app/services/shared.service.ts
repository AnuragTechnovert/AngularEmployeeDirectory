import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable()
export class SharedService {
    employeesDataSubject: Subject<Employee[]>;

    constructor() {
        this.employeesDataSubject = new Subject<Employee[]>();
    }
    updateChanges(employees: Employee[]): void {
        this.employeesDataSubject.next(employees);
    }
}