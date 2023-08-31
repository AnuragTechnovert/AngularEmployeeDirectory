import { Component } from '@angular/core';
import { alphabets } from '../contacts/varibles';
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
  isOpenForm: boolean = false;

  constructor(private filterService: FilterService, private router: Router) {
    this.alphabets = alphabets;
  }

  searchByAlphabet(alphabet: string): void {
    this.filterService.alphabetFilter(alphabet);
  }

  search(): void {
    this.filterService.searchFilter(this.filterValue, this.searchQuery);
  }

  openAddEmployeeForm(): void {
    this.router.navigate(['/employee/add']);
    this.isOpenForm = !this.isOpenForm;
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.filterValue = 'preferredname';
    this.filterService.resetFilter();
  }
}
