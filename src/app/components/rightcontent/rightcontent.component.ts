import { Component, ViewChild } from '@angular/core';

import { EmployeeformComponent } from '../employeeform/employeeform.component';

@Component({
  selector: 'app-rightcontent',
  templateUrl: './rightcontent.component.html',
  styleUrls: ['./rightcontent.component.css']
})
export class RightcontentComponent {

  @ViewChild(EmployeeformComponent)
  employeeFormComponent!: EmployeeformComponent;
}
