import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCreateService } from '../../services/event-create/event-create.service';
import { EventDetailService } from '../../services/event-detail/event-detail.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { SbToastService } from '../../services/iziToast/izitoast.service';
import { TimezoneCal } from '../../services/timezone/timezone.service';
import { TranslateService } from '@ngx-translate/core';
import { UserConfigService } from '../../services/userConfig/user-config.service';

@Component({
  selector: 'sb-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventCreateComponent implements OnInit {
  @Input() formFieldProperties: any;
  @Input() userId: any;

  @Output() closeSaveForm = new EventEmitter();
  @Output() navAfterSave = new EventEmitter();

  today = new Date();
  todayDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);

  formValues: any;
  startDate: any = this.todayDate;
  endDate: any = this.todayDate;
  startTime: any = (('0' + (this.today.getHours() + 1))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);
  endTime: any = (('0' + (this.today.getHours() + 2))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);
  registrationStartDate: any = this.todayDate;
  registrationEndDate: any = this.todayDate;
  timeDiff: any;
  queryParams: any;
  eventDetailsForm: any;
  isSubmitted = false;
  formFieldData: any;
  FormData: any;
  isNew: boolean = true;
  timezoneshort: any;
  canPublish: boolean = false;
  offset = this.timezoneCal.getTimeOffset();
  constFormFieldProperties: any;
  flag: boolean = true;
  eventCalender:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventCreateService: EventCreateService,
    private eventDetailService: EventDetailService,
    private router: Router,
    private location: Location,
    private sbToastService: SbToastService,
    private formBuilder: FormBuilder,
    private timezoneCal: TimezoneCal,
    private translate: TranslateService,
    private userConfigService: UserConfigService) {

  }

  customFields = this.formBuilder.group({
    startDate: [] = this.todayDate,
    endDate: [] = this.todayDate,
    startTime: [] = this.startTime,
    endTime: [] = this.endTime,
    registrationStartDate: [] = this.todayDate,
    registrationEndDate: [] = this.todayDate,

  });

  ngOnInit() {

    this.timezoneshort = this.timezoneCal.timeZoneAbbreviated();
    // setTimeout(() =>{
    // alert(this.userId);
    // });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams.identifier) {
        this.isNew = false;
      }
    });

    if (this.queryParams.identifier) {
      this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
        this.formFieldProperties = data.result['form'].data.fields;
      });

      



      this.eventDetailService.getEvent().subscribe((data: any) => {
        
        this.queryParams = data.result.event;
        console.log('this.queryParams = ', this.queryParams);
      },
        (err: any) => {
          console.log('err = ', err);
        });
    }


    if (this.queryParams.identifier) {
      setTimeout(() =>
        this.initializeFormFields(), 500);
    }

    let group = {}
  }

  initializeFormFields() {
    var editValues = {};
    var eventStart = (this.timezoneCal.calcTime(this.queryParams['startDate'], this.queryParams['startTime']));
    var eventEnd = (this.timezoneCal.calcTime(this.queryParams['endDate'], this.queryParams['endTime']));


    this.formFieldProperties.forEach(formField => {
      if (formField.code in this.queryParams) {

        if (formField.code == 'venue') {
          formField.default = this.queryParams[formField.code]['name'];
          editValues[formField.code] = this.queryParams[formField.code]['name'];

        } else if (formField.code == 'onlineProviderData') {
          formField.default = this.queryParams[formField.code]['meetingLink'];
          editValues[formField.code] = this.queryParams[formField.code]['meetingLink'];

        } else {
          formField.default = this.queryParams[formField.code];
          editValues[formField.code] = this.queryParams[formField.code];
        }
      }
    });

    this.formValues = editValues;
    this.formFieldData = this.formFieldProperties;
    console.log("formfielddata",this.formFieldData);
    console.log(this.formValues);

    this.customFields = this.formBuilder.group({
      startDate: [] = eventStart.getFullYear() + '-' + ('0' + (eventStart.getMonth() + 1)).slice(-2) + '-' + ('0' + eventStart.getDate()).slice(-2),
      endDate: [] = eventEnd.getFullYear() + '-' + ('0' + (eventEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + eventEnd.getDate()).slice(-2),
      startTime: [] = (('0' + (eventStart.getHours()))).slice(-2) + ":" + ('0' + eventStart.getMinutes()).slice(-2) + ":" + ('0' + eventStart.getSeconds()).slice(-2),
      endTime: [] = (('0' + (eventEnd.getHours()))).slice(-2) + ":" + ('0' + eventEnd.getMinutes()).slice(-2) + ":" + ('0' + eventEnd.getSeconds()).slice(-2),
      registrationStartDate: [] = this.queryParams['registrationStartDate'],
      registrationEndDate: [] = this.queryParams['registrationEndDate'],

    });

  }

  valueChanges(eventData) {
    if (eventData) {
      this.formValues = eventData;
      if (this.flag) { 
        this.constFormFieldProperties = this.formFieldProperties; 
        this.flag = false; 
      } else 
      { 
        this.formFieldProperties = this.constFormFieldProperties; 
        this.formFieldProperties.forEach(formField => {
            if (formField.code == 'eventType') {
              formField.default = eventData.eventType;
            } 
        });
    
      }
      if (eventData.eventType == "Offline") {
        console.log(eventData.eventType);
        this.formFieldProperties = this.formFieldProperties.filter((item) => item.code !== 'onlineProvider'); this.formFieldProperties = this.formFieldProperties.filter((item) => item.code !== 'onlineProviderData');
      } else if (eventData.eventType == "Online") {
        this.formFieldProperties = this.formFieldProperties.filter((item) => item.code !== 'venue');
      }
    }
  }

  /**
   * For validate data and call post form service
   */
  postData(canPublish) {
    this.isSubmitted = true;
    this.canPublish = canPublish;
    if (this.formValues == undefined) {
      this.sbToastService.showIziToastMsg("Please enter event name", 'warning');
    } else if (this.formValues.name == undefined || this.formValues.name.trim() == "") {
      this.sbToastService.showIziToastMsg("Please enter event name", 'warning');
    } else if (this.formValues.code == undefined) {
      this.sbToastService.showIziToastMsg("Please enter code", 'warning');
    } else if ((this.customFields.value.startDate == undefined || this.customFields.value.startTime == undefined || !this.timeValidation(this.customFields.value.startDate, this.customFields.value.startTime)) && this.isNew) {
      this.sbToastService.showIziToastMsg("Please enter valid event start date and time", 'warning');
    } else if ((this.customFields.value.endDate == undefined || this.customFields.value.endTime == undefined || !this.timeValidation(this.customFields.value.endDate, this.customFields.value.endTime)) && this.isNew) {
      this.sbToastService.showIziToastMsg("Please enter valid event end date and time", 'warning');

    } else if (this.customFields.value.registrationStartDate == undefined) {
      this.sbToastService.showIziToastMsg("Please enter valid event registration start date", 'warning');

    } else if (this.customFields.value.registrationEndDate == undefined) {
      this.sbToastService.showIziToastMsg("Please enter valid registration end date", 'warning');

    } else if (!this.dateValidation(this.customFields.value.startDate + " " + this.customFields.value.startTime, this.customFields.value.endDate + " " + this.customFields.value.endTime)) {
      this.sbToastService.showIziToastMsg("Event end date should be greater than start date", 'warning');

    } else if (!this.dateValidation(this.customFields.value.registrationStartDate, this.customFields.value.registrationEndDate)) {
      this.sbToastService.showIziToastMsg("Registration end date should be greater than registration start date", 'warning');
    } else if (!this.dateValidation(this.customFields.value.registrationStartDate + " 00:00:00", this.customFields.value.endDate)) {
      this.sbToastService.showIziToastMsg("Registration start date should be less than event end date", 'warning');
    } else if (!this.dateValidation(this.customFields.value.registrationEndDate + " 00:00:00", this.customFields.value.endDate)) {
      this.sbToastService.showIziToastMsg("Registration end date should be less than event end date", 'warning');
    }
    else {

      this.formValues = Object.assign(this.formValues, this.customFields.value)

      if (this.queryParams.identifier) {
        this.formValues["identifier"] = this.queryParams.identifier;
      }


      this.formValues["startTime"] = this.formValues["startTime"] + this.offset;
      this.formValues["endTime"] = this.formValues["endTime"] + this.offset;
      this.formValues['onlineProviderData'] = (this.formValues['onlineProviderData'] != null) ? ({ "meetingLink": this.formValues['onlineProviderData'] }) : {};
      this.formValues['venue'] = { "name": this.formValues['venue'] };
      this.formValues['owner'] = this.userId;

      if (this.isNew) {
        this.eventCreateService.createEvent(this.formValues).subscribe((data) => {
          if (data.responseCode == "OK") {
            this.dataSubmitted(data);
          }
        }, (err) => {
          console.log({ err });
          this.sbToastService.showIziToastMsg(err.error.result.messages[0], 'error');
        });

      } else {
        this.formValues['versionKey'] = this.queryParams.versionKey;

        this.eventCreateService.updateEvent(this.formValues).subscribe((data) => {
          if (data.responseCode == "OK") {
            this.dataSubmitted(data);
          }
        }, (err) => {
          console.log({ err });
          this.sbToastService.showIziToastMsg(err.error.result.messages[0], 'error');
        });
      }
    }

  }


  dataSubmitted(data) {
    if (this.canPublish) {
      this.eventCreateService.publishEvent(data.result.identifier).subscribe((res) => {
        this.navAfterSave.emit(data);
        this.sbToastService.showIziToastMsg("Event Created Successfully", 'success');
      });
    } else {
      this.navAfterSave.emit(data);
      this.sbToastService.showIziToastMsg("Event Created Successfully", 'success');
    }
  }

  cancel() {
    this.closeSaveForm.emit();
    //this.location.back()
  }

  /**
   * For time validation
   * 
   * @param sdate Contains data
   * @param time Contains time
   * @returns Return true if event start time is greater current time
   */
  timeValidation(date, time) {
    var startEventTime = new Date(date + " " + time);
    var startDifference = startEventTime.getTime() - this.today.getTime();
    var timeDiff = Math.round(startDifference / 60000);

    return (timeDiff > 0) ? true : false;
  }

  /**
   * For date validation
   * 
   * @param sdate Contains start data
   * @param edate Contains end data
   * @returns 
   */
  dateValidation(sdate, edate) {
    var startEventDate = new Date(sdate);
    var endEventDate = new Date(edate);

    var startDifference = endEventDate.getTime() - startEventDate.getTime();
    var timeDiff = Math.round(startDifference / 60000);

    return (timeDiff >= 0) ? true : false;
  }


}