import { Injectable, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class EventLibraryService {
  apiUrlConfig: any;
  constructor(
    private translate: TranslateService,
    @Optional() @Inject("urlConfig") public config: any) {
    this.apiUrlConfig = config.urlConfig;
    translate.setDefaultLang('en');
  }
}
