import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/modals/employee';

@Component({
  selector: 'app-employeecardcomponent',
  templateUrl: './employeecardcomponent.component.html',
  styleUrls: ['./employeecardcomponent.component.css']
})
export class EmployeecardcomponentComponent {
  @Input()
  employee!: Employee;
  @Output() cardClick: EventEmitter<Employee> = new EventEmitter<Employee>();

  onCardClick() {
    if (this.employee) {
      this.cardClick.emit(this.employee);
    }
  }
}
