# Getting Started

##### Event Library powered by angular. These componentsare designed to be used in

##### mobile and web portals to drive reusability, maintainabilityhence reducing the

##### redundant development effort significantly.

## Step 1: Install the package

```
npm install @tekdi/ngtek-event-library
```
## Step 2: Import the modules and components

##### Import the NgModule in your app app.module.ts file:

```
import { EventLibraryModule } from '@tekdi/ngtek-event-library'; <---
import * as configData from '../environments/urlConfig';<- - -

@NgModule({
declarations: [
AppComponent
],
imports: [
.....
...

EventLibraryModule.forChild(configData), <---
....
],
providers: [ ]

})
export class AppModule { }
```
**urlConfig.ts** file in your project root path and addyour api url with respective Key

```
export const urlConfig = {
detail : "/api/event/v4/read/",
list : "assets/api/eventlist.json",
create: "/api/event/v4/create",
update: "/api/event/v4/update",
formConfig : "assets/api/event-create.json",
ernrolEvents : "assets/api/enroll-list.json",
enroll: "/v1/event/enroll",
retire : "/private/event/v4/retire",
publish: "/event/v4/publish"
};
```
## Step 3: Include the sb-styles and assets in angular.json

##### Below mentioned lines add in your angular.json file

```
"assets" : [
{
"glob": "**/*",
"input": "./node_modules/@tekdi/ngtek-event-library/assets/",
"output": "/assets/"
}
]

"styles": [
...
...

"./node_modules/@tekdi/ngtek-event-library/assets/styles/styles.scss",
"node_modules/izitoast/dist/css/iziToast.min.css"

],
"scripts": [
"node_modules/izitoast/dist/js/iziToast.min.js"
]
```
## Available components
| Feature               | Description                               | Selector                | Codes                                                                                                                                                                                       |
|-----------------------|-------------------------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event List            | Use for show card list                    | sb-event-list           | <sb-event-list [list]="eventList" (eventDetailData)="navToEventDetail($event) " ></sb-event-list>                                                                                           |
| Event Cover           | Use for show event cover data             | sb-cover-event-detail   | <sb-cover-event-detail [eventDetailItem]="eventItem" (retireEventId)="retire($event)" [userData]="userId" ></sb-cover-event-detail>                                                         |
| Event Join Button     | Use for show event join and enroll button | sb-join-event-button    | <sb-join-event-button [eventDetailItem]="eventItem" [userData]="userId"  [canUnenroll]="true" ></sb-join-event-button>                                                                      |
| Event Advance detail  | Use for show more data about event        | sb-advance-event-detail | <sb-advance-event-detail [eventDetailItem]="eventItem"></sb-advance-event-detail>                                                                                                           |
| Event Create          | Use for show event create form            | sb-event-create         | <sb-event-create *ngIf="!isDetail" [formFieldProperties]="formFieldProperties" [userId]="userId" (closeSaveForm)="cancel($event)" (navAfterSave)="navAfterSave($event);"></sb-event-create> |
|                       |                                           |                         |                                                                                                                                                                                             |
## Available Services


#### 1. Event List Service:

##### Inject service in the component where you have touse:

```
import { EventListService} from '@tekdi/ngtek-event-library';
```
| Method         | Description                                |
|----------------|--------------------------------------------|
| getEventList() | This method will Provide a list of events  |

#### 2. Event DetailService:

##### Inject service in the component where you have touse:

```
import { EventDetailService} from '@tekdi/ngtek-event-library';
```
| Method               | Description                                                                                                          |
|----------------------|----------------------------------------------------------------------------------------------------------------------|
| getEvent(identifier) | Pass list api config and event Identifier to getEvent method and it will Provide a list of events with given filters |

#### 3. Event Create Service:

##### Inject service in the component where you have touse:

```
import { EventCreateService} from '@tekdi/ngtek-event-library';
```

| Method                | Description                                                                                                               |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| getEventFormConfig()  |  function is provide event form configurations                                                                            |
| createEvent(formData) | Pass formData ({Key : value}) to the createEvent method and it will create a new event and return success/error response. |
| updateEvent(formData) | Pass formData ({Key : value}) to the updateEvent method and it will create a new event and return success/error response. |



### 4.TimezoneService:

```
Import {TimezoneCal }from '@tekdi/ngtek-event-library';
```
| Method               | Description                                                                                                     |
|----------------------|-----------------------------------------------------------------------------------------------------------------|
| calcTime(date, Time) | Pass date and GMT time (Eg: 23:12:04+5.30) format it will return current country/city location in all over word |
| timeZoneAbbreviated  | Function return the timezone code (eg: IST)                                                                     |
|  getTimeOffset()     | Return time offset (eg: 5.30)                                                                                   |

## 5.Toast Message Service:


```
Import { SbToastService} from '@tekdi/ngtek-event-library';
```
| Method                                          | Description                                                                           |
|-------------------------------------------------|---------------------------------------------------------------------------------------|
| showIziToastMsg(message: string, type: string): | Show toast messages Message - Text display to user Type - error/success/warning /info |
| destroyIzitoast()                               | Destroy toast message                                                                 |

### 6.Post Request Service

```
Import { DataService} from '@tekdi/ngtek-event-library';
```
| Method             | Description           |
|--------------------|-----------------------|
| post(requestParam) | For request post call |
| get(requestParam)  | For request get call  |

RequestParam structure:

const RequestParam = {

```
url: api-url,
data: requestBody,
header: { 'Content-Type' : 'application/json'}
};
```

### 7.Event Service:

##### Method Description

| Method              | Description               |
|---------------------|---------------------------|
| getEnrollEvents()   | For get enroll event list |
| enrollToEventPost() | To enroll event           |

## Available Properties:

#### Event List

```
@Input() list: any; Event List Object
```
#### Event Cover

```
@Input() list: any; Event Detail Object
```
```
@Output() retireEventId EventEmitter<string>
```
```
@Input() userId :any; User Id
```
#### Event Join Button

```
@Input() eventDetailItem :any; EventEmitter<string>
```
```
@Input() userId :any; User id
```

#### Event Advance Detail

##### @Input() eventDetailItem :any; Event Detail Object

#### Event Create

##### @Input()formFieldProperties

##### :any;

```
Event Form Object
```
##### @Input() userId :any; User Id

```
@Output() closeSaveForm EventEmitter<string>
```
```
@Output() navAfterSave EventEmitter<string>
```
### Handle Redirections:

#### 1. Event List to Event Detail Page:

##### Add following line in your event list selector whereyou add the sb-event-list

##### selector

(eventDetailData)="navToEventDetail($event)"

Eg:

```
<sb-event-list (eventDetailData)="navToEventDetail($event) " >
</sb-event-list>
```
Then

Go to demo-event-list.ts file and insert followingcode:


```
navToEventDetail(res){
this.router.navigate(['/demo-event-detail]); //add your code here
....
}
```
#### 2. Cancel button on Event creation form

##### Add following line in your event create selector whereyou add the sb-event-create

##### selector

(creationCancel)=" **functionName** ($event)"

Eg:

```
<sb-event-create [formFieldProperties]="formFieldProperties"
(closeSaveForm)="cancel($event)" ></sb-event-create>
```
Then

##### Go to demo-event-create.ts file and insert followingcode:

```
functionName (){
this.router.navigate(['/home']); //add your codehere
}
```
#### 3. Save Event:

##### Add following line in your event create selector whereyou add the sb-event-create

##### selector

(navAfterSave)=" **functionName** ($event)"


Eg:

```
<sb-event-create ( navAfterSave )="saveData();" ></sb-event-create>
```
Then

##### Go to demo-event-create.ts file and insert followingcode:

```
saveData (){
//add your code here
....
}
```

