import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventListService } from '../../../projects/event-library/src/lib/events/services/event-list/event-list.service';
import { EventCreateService } from '../../../projects/event-library/src/lib/events/services/event-create/event-create.service';
import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';

@Component({
  selector: 'app-demo', 
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  eventList : any;
  eventItem: any;
  tab :string= "list";
  userId: any = "1001";
  formFieldProperties: any;
  isLoading: boolean =  true;

  p: number = 1;
  collection: any[];  

  constructor(
    private eventListService:EventListService,
    private eventCreateService: EventCreateService,
    private eventDetailService: EventDetailService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.showEventListPage();
    this.showEventCreatePage();

  }

  /**
   * For get List of events
   */ 
  showEventListPage(){
    this.eventListService.getEventList().subscribe((data:any)=>{
       console.log("data = ", data.result.content);
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
  

  Openview(view)
  {
    this.isLoading = true;
    if(view == 'list' ){
      this.tab = 'list';
    }else if(view == 'detail'){
      this.tab = 'detail';
    }else{
      this.tab = 'form';
    }
    this.isLoading = false;

  }


  showEventCreatePage() {
    this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
      this.formFieldProperties = data.result['form'].data.fields;
      this.isLoading = false;

      console.log(data.result['form'].data.fields);
    })
  }
  
  cancel(){
    //this.router.navigate(['/home']);
  }

  navAfterSave(res){
     //alert(res.result.identifier);
     this.eventDetailService.getEvent(res.result.identifier).subscribe((data: any) => {
      this.eventItem = data.result.event;
      this.tab = 'detail';
      this.isLoading = false;


      console.log(this.eventItem);
    },
      (err: any) => {
        console.log('err = ', err);
      });
   // this.eventItem = res.result.event;
   // alert('hi');
  }


}
