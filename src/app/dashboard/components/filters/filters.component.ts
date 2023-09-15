import { Component } from '@angular/core';
import { alphabets } from '../contacts/varibles';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

enum filterOptions {
  PreferredName,
  Department,
  Office,
  JobTitle
}
@Component({
  selector: 'dashboard-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  filterOptionsEnum = filterOptions;
  alphabets: string[];
  searchQuery: string = '';
  selectedFilterOption: number = filterOptions.PreferredName ;
  isOpenForm: boolean = false;

  constructor(private filterService: FilterService) {
    this.alphabets = alphabets;
  }

  searchByAlphabet(alphabet: string): void {
    this.filterService.alphabetFilter(alphabet);
  }

  search(): void {
    this.filterService.searchFilter(this.selectedFilterOption, this.searchQuery);
  }

  openAddEmployeeForm(): void {
    this.isOpenForm = !this.isOpenForm;
  }

  cardsContainerReset = () => {
    this.searchQuery = "";
    this.selectedFilterOption = filterOptions.PreferredName ;
    this.filterService.resetFilter();
  }
}