import { Component, Input } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { SharedService } from 'src/app/services/shared.service';
import { alphabets } from '../contacts/varibles';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  alphabets: string[];
  sharedService: SharedService;
  employeeService: EmployeeService;
  searchQuery: string = '';
  filterValue: string = 'preferredname';
  filterService: FilterService;
  @Input()
  employeeFormComponent!: EmployeeFormComponent;

  constructor(sharedService: SharedService, employeeService: EmployeeService, filterService: FilterService) {
    this.sharedService = sharedService;
    this.employeeService = employeeService;
    this.alphabets = alphabets;
    this.filterService = filterService;
  }

  searchByAlphabet(alphabet: string): void {
    this.filterService.alphabetFilter(alphabet);
  }

  search(): void {
    this.filterService.searchFilter(this.filterValue, this.searchQuery);
  }

  openAddEmployeeForm(): void {
    this.employeeFormComponent.openAddEmployeeForm();
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.filterValue = 'preferredname';
    this.filterService.resetFilter();
  }
}
