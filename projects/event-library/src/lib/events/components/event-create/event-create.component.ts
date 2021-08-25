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
import * as _ from 'lodash-es';

@Component({
  selector: 'sb-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventCreateComponent implements OnInit {
  @Input('formFieldProperties') formFieldProperties: any;
  @Input() userId: any;
  initialFormFieldProperties: any;

  @Output() closeSaveForm = new EventEmitter();
  @Output() navAfterSave = new EventEmitter();

  today = new Date();
  todayDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);

  formValues: any;
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
  tempEventType = null;
  tempVisibility;
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

  ngOnInit() {

    this.timezoneshort = this.timezoneCal.timeZoneAbbreviated();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams.identifier) {
        this.isNew = false;
      }
    });

    if (this.queryParams.identifier) {
      this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
        this.formFieldProperties = data.result['form'].data.fields;
        // this.prepareFormConfiguration();
      });

      this.eventDetailService.getEvent(this.queryParams.identifier).subscribe((data: any) => {
        
        this.queryParams = data.result.event;
        setTimeout(() => 
        this.initializeFormFields(), 500);
      },
        (err: any) => {
          console.log('err = ', err);
        });
    }

    if (!this.queryParams.identifier) {
      this.prepareFormConfiguration();
    }

    let group = {}

    // this.initialFormFieldProperties = _.cloneDeep(this.formFieldProperties);
  }

  prepareFormConfiguration(){
    // console.log('prepareFormConfiguration ::', this.formFieldProperties);
    this.formFieldProperties.forEach(formField => {
      switch (formField.code) {
        case 'eventType':
            this.tempEventType = formField.default ? formField.default : null;
            this.setEventTypeDependentFields(formField.default);
        break;
      
        case 'visibility':
            this.tempVisibility = formField.default ? formField.default : null;
            this.setVisibilityDependentFields(formField.default);
        break;
        
        case 'registrationStartDate':
        case 'registrationEndDate':
        case 'startDate':
        case 'endDate':
            formField.default = this.todayDate;
        break;

        case 'startTime':
            formField.default = this.startTime;
        break;
                      
        case 'endTime':
            formField.default = this.endTime;
        break;
      }
    });

    this.onValueChangeUpdateFieldBehaviour();
  }

  setEventTypeDependentFields(value) {
    switch (value) {
      case 'Online':
            this.formFieldProperties[3].editable = false;
            this.formFieldProperties[5].editable = true;
            this.formFieldProperties[6].editable = true;
       
          break;

      case 'Offline':
            this.formFieldProperties[3].editable = true;
            this.formFieldProperties[5].editable = false;
            this.formFieldProperties[6].editable = false;       
          break;

      case 'OnlineAndOffline':
            this.formFieldProperties[3].editable = true;
            this.formFieldProperties[5].editable = true;
            this.formFieldProperties[6].editable = true;
        break;

      default:
        this.formFieldProperties[3].editable = false;
        this.formFieldProperties[5].editable = false;
        this.formFieldProperties[6].editable = false;

        break;
    } 
  }

  setVisibilityDependentFields(value){
    switch (value) {
      case 'Parent':
            this.formFieldProperties[9].editable = true;
            this.formFieldProperties[8].editable = false;
       
          break;

      case 'Private':
            this.formFieldProperties[9].editable = false;
            this.formFieldProperties[8].editable = true;
          break;

      // case 'Default':

      //   break;

      default:
            this.formFieldProperties[9].editable = false;
            this.formFieldProperties[8].editable = false;
        break;
    } 
  }

  output(event) {
    // console.log('output::', event);
  }

  onStatusChanges(event) {
    // console.log('onStatusChanges::', event);
  }

  initializeFormFields() {
    // console.log('queryParams ::', this.queryParams);
    var editValues = {};
    var eventStart = (this.timezoneCal.calcTime(this.queryParams['startDate'], this.queryParams['startTime']));
    var eventEnd = (this.timezoneCal.calcTime(this.queryParams['endDate'], this.queryParams['endTime']));

    this.formFieldProperties.forEach(formField => {
      if (formField.code in this.queryParams) 
      {
        if (formField.code == 'venue') 
        {
          formField.default = this.queryParams[formField.code]['name'];
          editValues[formField.code] = this.queryParams[formField.code]['name'];

        } 
        else if (formField.code == 'onlineProviderData') 
        {
          formField.default = this.queryParams[formField.code]['meetingLink'];
          editValues[formField.code] = this.queryParams[formField.code]['meetingLink'];

        } 
        else if (formField.code == 'eventType') 
        {
          formField.default = this.queryParams[formField.code];
          editValues[formField.code] = this.queryParams[formField.code];
          this.setEventTypeDependentFields(formField.default);

        } 
        else if (formField.code == 'startTime') 
        {
          formField.default = (('0' + (eventStart.getHours()))).slice(-2) + ":" + ('0' + eventStart.getMinutes()).slice(-2) + ":" + ('0' + eventStart.getSeconds()).slice(-2),
          editValues[formField.code] = this.queryParams[formField.code];

        } 
        else if (formField.code == 'endTime') 
        {
          formField.default = (('0' + (eventEnd.getHours()))).slice(-2) + ":" + ('0' + eventEnd.getMinutes()).slice(-2) + ":" + ('0' + eventEnd.getSeconds()).slice(-2),
          editValues[formField.code] = this.queryParams[formField.code];

        } 
        else 
        {
          formField.default = this.queryParams[formField.code];
          editValues[formField.code] = this.queryParams[formField.code];
        }
      }
    });

    this.formValues = editValues;
    this.formFieldData = this.formFieldProperties;

    // console.log("formValues ::", this.formValues);
    // console.log("formFieldData ::", this.formFieldData);
  }

  valueChanges(eventData) {
    // this.initialFormFieldProperties = _.cloneDeep(this.formFieldProperties);

    if (eventData) 
    {
      this.formValues = eventData;
    
      if (this.flag) 
      { 
        this.constFormFieldProperties = this.formFieldProperties; 
        this.flag = false; 
      } 
      else 
      { 
        this.formFieldProperties = this.constFormFieldProperties; 

        this.formFieldProperties.forEach(formField => {
          formField.default = eventData[formField.code];
        });
      }
    }

    if (eventData.visibility != this.tempVisibility || eventData.eventType != this.tempEventType)
    {
      // console.log('let inner Main If eventType A - ', this.tempEventType);

      if (eventData.eventType != this.tempEventType)
      {
        // console.log('let before assign 2nd If eventType B- ', this.tempEventType , ' == ', eventData.eventType);
        this.tempEventType = eventData.eventType;
        this.setEventTypeDependentFields(eventData.eventType);
      }

      if (eventData.visibility != this.tempVisibility)
      {
        this.tempVisibility = eventData.visibility;
        this.setVisibilityDependentFields(eventData.visibility);
      }

      // console.log('let after assign eventType C- ', this.tempEventType);
      this.onValueChangeUpdateFieldBehaviour();
    }

    // console.log('let outer if eventType - ', this.tempEventType);
  }

  onValueChangeUpdateFieldBehaviour(){
    
    const formFieldPropertiesConst = this.formFieldProperties;
    delete this.formFieldProperties;

    setTimeout(() => {
      this.formFieldProperties = formFieldPropertiesConst }, 50);
     
  }

  /**
   * For validate data and call post form service
   */
  postData(canPublish) {
    // console.log('Post Data ::', this.formValues);

    this.isSubmitted = true;
    this.canPublish = canPublish;
    
    if (this.formValues == undefined) 
    {
      this.sbToastService.showIziToastMsg("Please enter event name", 'warning');

    } 
    else if (this.formValues.name == undefined || this.formValues.name.trim() == "") 
    {
      this.sbToastService.showIziToastMsg("Please enter event name", 'warning');

    } 
    else if (this.formValues.code == undefined) 
    {
      this.sbToastService.showIziToastMsg("Please enter code", 'warning');

    } 
    else if ((this.formValues.startDate == undefined || this.formValues.startTime == undefined || !this.timeValidation(this.formValues.startDate, this.formValues.startTime)) && this.isNew) 
    {
      this.sbToastService.showIziToastMsg("Please enter valid event start date and time", 'warning');

    } 
    else if ((this.formValues.endDate == undefined || this.formValues.endTime == undefined || !this.timeValidation(this.formValues.endDate, this.formValues.endTime)) && this.isNew) 
    {
      this.sbToastService.showIziToastMsg("Please enter valid event end date and time", 'warning');

    } 
    else if (this.formValues.registrationStartDate == undefined) 
    {
      this.sbToastService.showIziToastMsg("Please enter valid event registration start date", 'warning');

    } 
    else if (this.formValues.registrationEndDate == undefined) 
    {
      this.sbToastService.showIziToastMsg("Please enter valid registration end date", 'warning');

    } 
    else if (!this.dateValidation(this.formValues.startDate + " " + this.formValues.startTime, this.formValues.endDate + " " + this.formValues.endTime)) 
    {
      this.sbToastService.showIziToastMsg("Event end date should be greater than start date", 'warning');

    } 
    else if (!this.dateValidation(this.formValues.registrationStartDate, this.formValues.registrationEndDate)) 
    {
      this.sbToastService.showIziToastMsg("Registration end date should be greater than registration start date", 'warning');
    
    } 
    else if (!this.dateValidation(this.formValues.registrationStartDate + " 00:00:00", this.formValues.endDate)) 
    {
      this.sbToastService.showIziToastMsg("Registration start date should be less than event end date", 'warning');
    
    } 
    else if (!this.dateValidation(this.formValues.registrationEndDate + " 00:00:00", this.formValues.endDate)) 
    {
      this.sbToastService.showIziToastMsg("Registration end date should be less than event end date", 'warning');
    
    }
    else 
    {
      this.formValues = Object.assign(this.formValues)

      if (this.queryParams.identifier) 
      {
        this.formValues["identifier"] = this.queryParams.identifier;
      }

      this.formValues["startTime"] = this.formValues["startTime"] + this.offset;
      this.formValues["endTime"] = this.formValues["endTime"] + this.offset;
      this.formValues['onlineProviderData'] = (this.formValues['onlineProviderData'] != null) ? ({ "meetingLink": this.formValues['onlineProviderData'] }) : {};
      this.formValues['venue'] = { "name": this.formValues['venue'] };
      this.formValues['owner'] = this.userId;

      // console.log('Create Events ::', this.formValues);
      // console.log('queryParams ::', this.queryParams);

      if (this.isNew) 
      {
        this.eventCreateService.createEvent(this.formValues).subscribe((data) => {
          if (data.responseCode == "OK") 
          {
            this.dataSubmitted(data);
          }
        }, (err) => {
          console.log({ err });
          this.sbToastService.showIziToastMsg(err.error.result.messages[0], 'error');
        });

      } 
      else 
      {
        this.formValues['versionKey'] = this.queryParams.versionKey;

        this.eventCreateService.updateEvent(this.formValues).subscribe((data) => {
          if (data.responseCode == "OK") 
          {
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
        // this.sbToastService.showIziToastMsg("Event Created Successfully", 'success');
      });
    } else {
      this.navAfterSave.emit(data);
      // this.sbToastService.showIziToastMsg("Event Created Successfully !", 'success');
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


