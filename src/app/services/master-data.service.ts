// departments.service.ts
import { Injectable,OnInit } from '@angular/core';
import { Departments } from '../models/departments';
import { JobTitles } from '../models/jobtitles';
import { Offices } from '../models/offices';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root', 
})
export class MasterDataService {
  
  constructor(private employeeService:EmployeeService ){
  }
  
}
