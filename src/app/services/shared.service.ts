import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable()
export class SharedService {
    private employeesDataSubject: Subject<Employee[]>;

    constructor() {
        this.employeesDataSubject = new Subject<Employee[]>();
    }

    updateChanges(employees: Employee[]): void {
        this.employeesDataSubject.next(employees);  
    }

    getEmployeesDataSubject():Observable<Employee[]>{
        return this.employeesDataSubject.asObservable();
    }

}