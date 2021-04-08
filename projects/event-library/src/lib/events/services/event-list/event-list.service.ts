import { Injectable } from '@angular/core';
import { UserConfigService } from '../userConfig/user-config.service';
import { DataService } from '../data-request/data-request.service';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  constructor(
    private userConfigService: UserConfigService,
    private dataService: DataService) {
  }


  /**
   * For get event list 
   */
  getEventList() {
    const req = {
      url: this.userConfigService.getConfigUrl().list
    };

    return this.dataService.get(req);
  }

  getEventFilters() {
    // return this.http.get<any>('assets/eventFilter.json');
  }

}
