import { Component, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  @ViewChild(EmployeeFormComponent)
  employeeFormComponent!: EmployeeFormComponent;
}
