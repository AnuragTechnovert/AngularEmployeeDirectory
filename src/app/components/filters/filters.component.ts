import { Component, Input } from '@angular/core';
import { alphabets } from '../contacts/varibles';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  alphabets: string[];
  searchQuery: string = '';
  filterValue: string = 'preferredname';
  @Input()
  employeeFormComponent!: EmployeeFormComponent;

  constructor(private filterService: FilterService , private router:Router) {
    this.alphabets = alphabets;
  }

  searchByAlphabet(alphabet: string): void {
    this.filterService.alphabetFilter(alphabet);
  }

  search(): void {

    this.filterService.searchFilter(this.filterValue, this.searchQuery);
  }

  openAddEmployeeForm(): void {
// this.router.navigate(['/employee/add']);
    this.employeeFormComponent.openAddEmployeeForm();
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.filterValue = 'preferredname';
    this.filterService.resetFilter();
  }
}
