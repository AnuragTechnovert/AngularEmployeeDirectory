import { Component } from '@angular/core';
import { alphabets } from '../contacts/varibles';
import { FilterService } from 'src/app/services/filter.service';
import { filterOptionsEnum } from 'src/app/enums/filter-options-enum';

@Component({
  selector: 'dashboard-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  filterOptionsEnum = filterOptionsEnum;
  selectedAlphabet: string = '';
  alphabets: string[];
  searchQuery: string = '';
  selectedFilterOption: number = this.filterOptionsEnum.PreferredName;
  isOpenForm: boolean = false;

  constructor(private filterService: FilterService) {
    this.alphabets = alphabets;
  }

  searchByAlphabet(alphabet: string): void {
    if (this.selectedAlphabet == alphabet) {
      this.selectedAlphabet = '';
      this.filterService.alphabetFilter('');
    }
    else {
      this.selectedAlphabet = alphabet;
      this.filterService.alphabetFilter(alphabet);
    }

  }

  search(): void {
    this.filterService.searchFilter(this.selectedFilterOption, this.searchQuery);
  }

  openAddEmployeeForm(): void {
    this.isOpenForm = !this.isOpenForm;
  }

  cardsContainerReset = () => {
    this.selectedAlphabet = '';
    this.searchQuery = "";
    this.selectedFilterOption = this.filterOptionsEnum.PreferredName;
    this.filterService.resetFilter();
  }
}