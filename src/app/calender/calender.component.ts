
import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input
} from '@angular/core';
import {EventListService} from '../../../projects/event-library/src/lib/events/services/event-list/event-list.service';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { CustomEventTitleFormatter } from '../../../projects/event-library/src/lib/events/services/event-title-formatter/custom-event-title-formatter.provider';
import { Router } from '@angular/router';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
 
};



@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalenderComponent implements OnInit {
  eventCalender: any;
  eventItem: any;
  eventDetaildata:any;
  isOwner = true;
  @Input() eventDetailItem: any;
  @Input() userData: any;
  @Input() canUnenroll: boolean;
  @ViewChild('modalContent', { static: true,read: TemplateRef  }) modalContent: TemplateRef<any>;
  //@ViewChild('sayHelloTemplate', { read: TemplateRef }) sayHelloTemplate:TemplateRef<any>;

  view: CalendarView = CalendarView.Month;


  CalendarView = CalendarView;
  closeResult = '';
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
//label: '<i class="fas fa-fw fa-pencil-alt"></i>',
//<i class="fas fa-fw fa-pencil"></i>

// {
//   label: '<i class="fa fa-pencil" aria-hidden="true"></i>',
//   a11yLabel: 'Edit',
//   onClick: ({ event }: { event: CalendarEvent }): void => {
//     console.log("in action edit view", event);
//     this.handleEvent('Edited', event);
//   }


//'<i class="fas fa-pen"></i>',
//label: '<i class="fas fa-fw fa-trash-alt"></i>',
  actions: CalendarEventAction[] = [
    {
      label: '',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log("in action edit view", event);
        this.handleEvent('Edited', event);
      }
    }
    // {
    //    label: 'Delete',
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter((iEvent) => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   },
    // },
  ];

  refresh: Subject<any> = new Subject();

  events : CalendarEvent[];
  

 


  activeDayIsOpen: boolean = true

  constructor(private modal: NgbModal,private eventListService:EventListService, private router: Router) { }

  ngOnInit() {
    console.log("event===>", this.events);
    this.showCalenderEvent();
    
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // to be checked with loggin id
    this.isOwner = (this.modalData.event.owner=='1001') ? true : false;
 
    this.modal.open(this.modalContent);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
        //console.log(events);
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }


  


 
 

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  showCalenderEvent(){
    this.eventListService.getCalenderlist().subscribe((data: any) => {
      console.log("data = ");
      this.eventCalender = data.result.content;
      
      console.log( this.eventCalender )
     this.events =this.eventCalender.map(obj => ({
    start : new Date(obj.startDate),
    title: obj.name,
    starttime:obj.startTime,
    end: new Date(obj.endDate),
    color: colors.red,
    actions: this.actions,
    cssClass: obj.color,
    status:obj.status,
    onlineProvider:obj.onlineProvider,
    audience: obj.audience,
    owner:obj.owner,
    identifier:"do_11322182566085427211",
    


    
      }));
      
console.log("after =>", this.events);

    })
  }


  navToEventDetail(res) {
    console.log("navToEventDetail", res);
   
    var obj=res;
    this.eventDetaildata ={ }
    // this.eventDetaildata.startDate = obj.start,
    //  this.eventDetaildata.startDate = "2021-03-31",
    // this.eventDetaildata.name=obj.title,
    // this.eventDetaildata.startTime=obj.starttime,
    // this.eventDetaildata.endDate= obj.end,
    // this.eventDetaildata.color= colors.red,
    // this.eventDetaildata.actions= this.actions,
    // this.eventDetaildata.cssClass= obj.color,
    // this.eventDetaildata.status=obj.status,
    // this.eventDetaildata.onlineProvider=obj.onlineProvider,
    // this.eventDetaildata.audience=obj.audience,
    // this.eventDetaildata.owner="1001"

    

    console.log("navdetail",obj.identifier)
  
      
    

    
    this.router.navigate(['/event-post'], {
      queryParams: {
        identifier:obj.identifier
      }
    });

    
  }
  

}
