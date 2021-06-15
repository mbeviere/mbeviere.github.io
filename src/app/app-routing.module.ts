import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkRecordComponent } from './work-record/work-record.component';
import { HomeComponent } from './home/home.component';
import { WorkRecordHIComponent } from './work-record-hi/work-record-hi.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path: 'work-record/:id', component: WorkRecordComponent},
  { path: 'work-record/:id/:docId', component: WorkRecordComponent},
  { path : 'work-record-hi/:id', component : WorkRecordHIComponent},
  { path : 'work-record-hi/:id/:docId', component : WorkRecordHIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
