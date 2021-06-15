import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import { AppComponent } from './app.component';
import { ScatterComponent } from './scatter/scatter.component';
import { LeftColumnComponent } from './left-column/left-column.component';
import { SecondScatterComponent } from './second-scatter/second-scatter.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { WorkRecordComponent } from './work-record/work-record.component';
import { HomeComponent } from './home/home.component';


import { AppRoutingModule } from './app-routing.module';
import { LeftColumnHIComponent } from './left-column-hi/left-column-hi.component';
import { WorkRecordHIComponent } from './work-record-hi/work-record-hi.component';
import { WorkTitleHIComponent } from './work-title-hi/work-title-hi.component';
import { WorkHIComponent } from './work-hi/work-hi.component';
import { DocumentDetailHIComponent } from './document-detail-hi/document-detail-hi.component';
import { DocumentZoomHiComponent } from './document-zoom-hi/document-zoom-hi.component';
import { WorkTitleComponent } from './work-title/work-title.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ScatterComponent,
    LeftColumnComponent,
    SecondScatterComponent,
    DocumentDetailComponent,
    EventDetailComponent,
    WorkRecordComponent,
    HomeComponent,
    LeftColumnHIComponent,
    WorkRecordHIComponent,
    WorkTitleHIComponent,
    WorkHIComponent,
    DocumentDetailHIComponent,
    DocumentZoomHiComponent,
    WorkTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
