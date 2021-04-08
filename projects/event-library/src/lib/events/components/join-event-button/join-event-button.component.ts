import { Component, OnInit, Input } from '@angular/core';
import { TimezoneCal } from '../../services/timezone/timezone.service';
import { EventService } from '../../services/event/event.service'

@Component({
  selector: 'sb-join-event-button',
  templateUrl: './join-event-button.component.html',
  styleUrls: ['./join-event-button.component.scss']
})

export class JoinEventComponent implements OnInit {
  @Input() eventDetailItem: any;
  @Input() userData: string;
  @Input() canUnenroll: boolean = true;


  todayDateTime: any;
  isUserAbleToJoin: boolean = false;
  isEnrolled: boolean = false;
  today: any;
  todayDate: any;
  todayTime: any;
  startInMinutes: any;
  items: any;

  constructor(
    private eventService: EventService,
    private timezoneCal: TimezoneCal
        ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.isEnrollEvent();

    }, 1000);

    setInterval(() => {
      this.joinEvent();
    }, 1000);
  }


  /**
   * For validate and show/hide join button
   */
  async joinEvent() {

    this.today = new Date();
    this.todayDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
    this.todayTime = this.today.getHours() + ":" + this.today.getMinutes();


    var todayDateTime = this.timezoneCal.calcTime(this.todayDate, this.todayTime);
    var startEventTime = await this.timezoneCal.calcTime(this.eventDetailItem.startDate, this.eventDetailItem.startTime);

    var startDifference = startEventTime.getTime() - todayDateTime.getTime();
    var startInMinutes = Math.round(startDifference / 60000);

    var endEventTime = this.timezoneCal.calcTime(this.eventDetailItem.endDate, this.eventDetailItem.endTime);

    var endDifference = todayDateTime.getTime() - endEventTime.getTime();
    var endInMinutes = Math.round(endDifference / 60000);
    this.isUserAbleToJoin = (startInMinutes <= 10 && endInMinutes < 0) ? true : false;

  }

  /**
    * For check user is enrolled or not
    * @param courseId Event id
    * @param userId Log-in user Id 
    */
  isEnrollEvent() {
    this.eventService.getEnrollEvents(this.eventDetailItem.identifier, this.userData).subscribe((data) => {
      this.items = data.result.courses;

      this.items.find((o, i) => {
        if (o.courseId === this.eventDetailItem.identifier) {
          this.isEnrolled = true;
        }

      });
    });
  }

    /**
   * Enroll/Unenroll event
   * 
   * @param action enroll/unenroll 
   */
     enrollToEvent(action) {
      this.eventService.enrollToEventPost(action, this.eventDetailItem.code, this.userData);
    }

  /**
   * For join attain event
   * 
   * @param joinLink event join url
   */
  openProviderLink(joinLink) {
    window.open(joinLink, "_blank");
  }
}
