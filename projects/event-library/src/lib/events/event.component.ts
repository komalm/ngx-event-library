import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  title = 'EventLibrary';

  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');

  }

}
