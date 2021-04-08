import { Component, OnInit } from '@angular/core';
import {EventListService} from '../../../projects/event-library/src/lib/events/services/event-list/event-list.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor( private eventListService: EventListService,
    private router: Router) { }
  eventList: any;

  ngOnInit() {
    this.showEventListPage();

  }
  showEventListPage(){
    this.eventListService.getEventList().subscribe((data:any)=>{
       console.log("data = ", data);
       this.eventList = data.result.content;
      })
  }

  navToEventDetail(res){

    console.log({res});
    this.router.navigate(['home'], {
      queryParams: {
        identifier: res.identifier,
        view: 'home'
      }
    });
    }
  
}
