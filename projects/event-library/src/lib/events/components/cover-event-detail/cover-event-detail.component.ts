import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import{ labelMessages } from './../labels';
import { EventService } from '../../services/event/event.service'
import { TimezoneCal } from '../../services/timezone/timezone.service';
import { DataService } from '../../services/data-request/data-request.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sb-cover-event-detail',
  templateUrl: './cover-event-detail.component.html',
  styleUrls: ['./cover-event-detail.component.scss']
})
export class CoverEventDetailComponent implements OnInit {
  @Input() eventDetailItem: any;
  @Input() userData: string;
  isOwner: boolean = true;
  labelMessages = labelMessages;
  eStart: any;
  eEnd: any;
  isEnrolled: boolean = false;
  items: any;
  timezoneshort : string;
  constructor(
    private router:Router,
    private eventService: EventService,
    private timezoneCal: TimezoneCal,
    private dataService: DataService,
    public translate: TranslateService) {
  }
  @Output() retireEventId = new EventEmitter<string>();

  ngOnInit() {
    // this.dataService.get({url : 'https://jsonplaceholder.typicode.com/todos/1'}).subscribe(response => 
    //   {
    //     console.log({response});
    //   });

    setTimeout(() => {
     this.isOwner = (this.eventDetailItem.owner == this.userData) ? true : false;

      this.timezoneshort = this.timezoneCal.timeZoneAbbreviated();
      this.setDateTimeOnCover();
    }, 1000);
  }

  /**
   * for show Date Time as per timezone
   */
  setDateTimeOnCover() {
    this.eStart = (this.timezoneCal.calcTime(this.eventDetailItem.startDate, this.eventDetailItem.startTime)).toLocaleString();
    this.eEnd = (this.timezoneCal.calcTime(this.eventDetailItem.endDate, this.eventDetailItem.endTime)).toLocaleString();
  }

  upate(identifier, versionKey) {
     this.router.navigate(['/event-post'], {
      queryParams: {
        identifier: identifier,
        versionKey: versionKey
      }
    });
  }
  
  retireEvent(identifier: string) {
    this.retireEventId.emit(identifier);
  }

}
