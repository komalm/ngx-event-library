import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {
  eventItem: any;
  userId: any = "999";
  isLoading: boolean =  true;
  queryParams:any;

  constructor(
    private route: ActivatedRoute,
    private eventDetailService: EventDetailService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getEventDetail();
  }

  /**
   * Get Single event detail
   */
  getEventDetail(): void {
    // Get the url (query) params
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

    // Subsribe to the event detail service and get single event data
    this.eventDetailService.getEvent(this.queryParams.identifier)
        .subscribe((data: any) => {
          this.eventItem = data.result.event;
          this.isLoading = false;
          console.log('Event Detail Player - ', this.eventItem);
        },(err: any) => {
          console.log('err = ', err);
        });
  }

  goBack(): void {
    this.location.back();
  }
}
