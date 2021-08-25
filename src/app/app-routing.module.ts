import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFomComponent } from './user-fom/user-fom.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DemoComponent } from '../app/demo/demo.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EnrollUsersComponent } from './enroll-users/enroll-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: UserListComponent },
  { path: 'form', component: UserFomComponent },
  { path: 'wrapper', component: UserDetailComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'play/event-detail', component: EventDetailComponent },
  { path: 'enroll-users', component: EnrollUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
