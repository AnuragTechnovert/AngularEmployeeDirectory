import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'dashboard-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input()
  employee!: Employee;
  @Output() cardClick: EventEmitter<Employee> = new EventEmitter<Employee>();

  onCardClick() {
    if (this.employee) {
      this.cardClick.emit(this.employee);
    }
  }
}
