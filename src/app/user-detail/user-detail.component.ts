import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  eventItem: any;
  eventList: any;
  userId: any = "123";
  constructor(private eventDetailService: EventDetailService,
    private activatedRoute : ActivatedRoute
  
   ) { }

  ngOnInit() {
    this.showEventDetailPage();
  }

 async showEventDetailPage() {
    await this.eventDetailService.getEvent('do_1132472335546777601366').subscribe((data: any) => {
      this.eventItem = data.result.event;
      console.log(this.eventItem);
    },
      (err: any) => {
        console.log('err = ', err);
      });
  }

}
