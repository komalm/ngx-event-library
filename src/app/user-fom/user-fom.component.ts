import { Component, OnInit } from '@angular/core';
import { EventCreateService } from '../../../projects/event-library/src/lib/events/services/event-create/event-create.service';
import { Router } from '@angular/router'
import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';

@Component({
  selector: 'app-user-fom',
  templateUrl: './user-fom.component.html',
  styleUrls: ['./user-fom.component.scss']
})
export class UserFomComponent implements OnInit {
  isDetail = false;
  eventItem : any;
  userId : string = "999";
  formFieldProperties: any;

  constructor(private eventCreateService: EventCreateService,
    private eventDetailService: EventDetailService ,
    private router: Router) { 

    }

  ngOnInit() {
    this.showEventCreatePage();
  }

  showEventCreatePage() {
    this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
      this.formFieldProperties = data.result['form'].data.fields;
      console.log(data.result['form'].data.fields);
    })
  }
  
  cancel(){
    this.router.navigate(['/demo']);
  }

  navAfterSave(res){
     alert(res.result.identifier);
     this.eventDetailService.getEvent(res.result.identifier).subscribe((data: any) => {
      this.eventItem = data.result.event;
    this.isDetail = true;

      console.log(this.eventItem);
    },
      (err: any) => {
        console.log('err = ', err);
      });
   // this.eventItem = res.result.event;
   // alert('hi');
  }




}
