import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MasterData } from '../models/masterdata';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  masterData:MasterData = {
    departments: [],
    offices: [],
    jobTitles: []
  };
  constructor(private apiService: ApiService) {
  }

  getMasterData() {
    let masterData = JSON.parse(localStorage.getItem('masterData')!);
    if (masterData) {
      this.masterData = masterData;
      return masterData;
    }

    this.apiService.get('Employee/GetMasterData').subscribe((masterData) => {
      localStorage.setItem('masterData', JSON.stringify(masterData));
      this.masterData = masterData;
      return masterData;
    })
  }

}