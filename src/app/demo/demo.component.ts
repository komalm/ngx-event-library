
import {
  Component, OnInit,
  ChangeDetectionStrategy,
  
} from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { EventListService } from '../../../projects/event-library/src/lib/events/services/event-list/event-list.service';
import { EventCreateService } from '../../../projects/event-library/src/lib/events/services/event-create/event-create.service';
import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';
import { Router,ActivatedRoute } from '@angular/router';




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
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  yellow: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
};


@Component({

  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  


  eventList: any;
  eventItem: any;
  enrollUsers: any;
  tab :string= "list";
  userId: any = "1001";
  formFieldProperties: any;
  isLoading: boolean =  true;
  eventIdentifier = "do_11322166143296307218"
  enrollData: any;

  p: number = 1;
  collection: any[];

  constructor(
    private eventListService: EventListService,
    private eventCreateService: EventCreateService,
    private eventDetailService: EventDetailService,
    
    private router: Router,
    

  ) { }






  ngOnInit() {
   
      
    this.showEventListPage();
    this.showEventCreatePage();
    // this.getEnrollEventUsersList();

  }

  // getEnrollEventUsersList(){
  //   this.eventService.getEnrollEvents(this.eventIdentifier, '').subscribe((data) => {
  //     this.enrollData = data.result.events;

  //     console.log('getEnrollEventUsersList ::', this.enrollData);
  //   });
  // }

  /**
   * For get List of events

   */
 

  showEventListPage(){
    this.eventListService.getEventList().subscribe((data:any)=>{
      //  console.log("showEventListPage ::", data.result.content);
      this.eventList = data.result.content;
      this.isLoading = false;

    })
  }

  /**
   * For subscibe click action on event card
   */

  

   navToEventDetail(event){
    this.router.navigate(['/play/event-detail'], {
      queryParams: {
        identifier: event.identifier
      }
    });

    console.log('Demo Component - ', event.identifier);

  }

  Openview(view) {
    this.isLoading = true;

    if (view == 'list') {
      this.tab = 'list';
    } else if (view == 'detail') {
      this.tab = 'detail';
    }
    else if (view == 'enrollUsersList')
    {
      // this.tab = 'enrollUsersList';
      this.router.navigate(['/enroll-users'], {
        queryParams: {
          identifier: this.eventIdentifier
        }
      });
    } else if (view == 'calender') {
       this.router.navigate(['/calender']);
    } else
    {
      // this.tab = 'form';
      this.router.navigate(['/form'], {
        queryParams: {
          // identifier: event.identifier
        }
      });
    }

    this.isLoading = false;
  }


  showEventCreatePage() {
    this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
      this.formFieldProperties = data.result['form'].data.fields;
      this.isLoading = false;

      // console.log(data.result['form'].data.fields);
    })
  }
  
  cancel(){
    this.router.navigate(['/home']);
  }

  navAfterSave(res) {
    
    this.eventDetailService.getEvent(res.result.identifier).subscribe((data: any) => {
      this.eventItem = data.result.event;
      this.tab = 'detail';
      this.isLoading = false;


      // console.log(this.eventItem);
    },
      (err: any) => {
        console.log('err = ', err);
      });
    
  }


}
