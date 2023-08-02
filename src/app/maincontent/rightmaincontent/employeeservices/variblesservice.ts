import { Injectable } from '@angular/core';
import { Employee } from '../variables';

@Injectable()
export class SharedVaribleService {

    employeesData: Employee[] = [];
    filteredData: Employee[] | undefined;
    alphabets: string[] | undefined;
    isEditMode : any = false;

    constructor() {
        const dataFromLocalStorage = localStorage.getItem('employees');
        if (dataFromLocalStorage) {
            this.employeesData = JSON.parse(dataFromLocalStorage);
        }
    }

}
