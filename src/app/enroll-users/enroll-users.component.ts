import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../../projects/event-library/src/lib/events/services/event/event.service';
import { UsersService } from './../../../projects/event-library/src/lib/events/services/users/users.service';

@Component({
  selector: 'app-enroll-users',
  templateUrl: './enroll-users.component.html',
  styleUrls: ['./enroll-users.component.scss']
})
export class EnrollUsersComponent implements OnInit {

  // eventIdentifier = "do_11322166143296307218"
  enrollData: any;
  queryParams:any;
  userData: any;
  eventUserEnrollData: any;

  isLoading: boolean =  true;
  tab :string= "list";
  p: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService, 
    private router: Router, 
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    // Get the url (query) params
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

    this.getEnrollEventUsersList();
  }

/**
 * Get list of enrollment data of selected event
 */
  getEnrollEventUsersList(){
    this.eventService.getEnrollEvents(this.queryParams.identifier, '').subscribe((data) => {
      this.enrollData = data.result.events;
      this.getEnrolledUserInfo();
    });
  }

/**
 * Get list of User data of selected event
 */
  getEnrolledUserInfo()
  {
    this.enrollData.forEach(event => {
      this.usersService.getUser(event.userId).subscribe((data) => {
         this.userData = data.result.response.filter((item) => item.id === event.userId);

         event.userFname = this.userData[0].firstname;
         event.userLname = this.userData[0].lastname;
         event.userEmail = this.userData[0].email;
         event.userAttendantStatus = event.status == 2 ? "Present" : "Absent";
      });

      this.convert(event.enrolledDate);
    });

    this.eventUserEnrollData = this.enrollData;
  }

  convert(event) {
    var date = new Date(event),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    
    var datestr = [date.getFullYear(), mnth, day].join("/");

    return datestr;
  }
  
  Openview(view)
  {
    this.isLoading = true;

    if(view == 'list' )
    {
      this.router.navigate(['/demo'], { });
    }
    else if(view == 'detail')
    {
      this.tab = 'detail';
    }
    else if (view == 'enrollUsersList')
    {
      this.router.navigate(['/enroll-users'], {
        queryParams: {
          identifier: this.queryParams.identifier
        }
      });
    }
    else
    {
      this.router.navigate(['/form'], {
        queryParams: {
          // identifier: event.identifier
        }
      });
    }

    this.isLoading = false;
  }
}
