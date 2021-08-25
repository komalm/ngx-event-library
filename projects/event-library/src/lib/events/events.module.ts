import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { JoinEventComponent } from './components/join-event-button/join-event-button.component';
import { AdvanceEventDetailComponent } from './components/advance-event-detail/advance-event-detail.component';
import { CoverEventDetailComponent } from './components/cover-event-detail/cover-event-detail.component';
import { EventFilterComponent} from '../events/components/event-filter/event-filter.component';
import { EventRoutingModule } from './event-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFormElementsModule } from 'common-form-elements';
import { NgxIziToastModule } from 'ngx-izitoast';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { EnrollEventUsersComponent } from './components/enroll-event-users/enroll-event-users.component'; // <-- import the module

@NgModule({
  declarations: [
    EventDetailComponent, 
    EventListComponent, 
    EventCreateComponent,
    JoinEventComponent,
    AdvanceEventDetailComponent,
    CoverEventDetailComponent,
    EventFilterComponent,
    EnrollEventUsersComponent
  ],
  imports: [
    CommonModule,
    CommonFormElementsModule,
    FormsModule,
    ReactiveFormsModule,
    EventRoutingModule,
    NgxIziToastModule, 
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    EventDetailComponent,
    EventListComponent,
    EventCreateComponent,
    JoinEventComponent,
    AdvanceEventDetailComponent,
    CoverEventDetailComponent,
    EventFilterComponent,
    EnrollEventUsersComponent
  ],
  providers: [ ]
})
export class EventsModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
