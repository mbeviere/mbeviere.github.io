import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRecordHIComponent } from './work-record-hi.component';

describe('WorkRecordHIComponent', () => {
  let component: WorkRecordHIComponent;
  let fixture: ComponentFixture<WorkRecordHIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRecordHIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRecordHIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
