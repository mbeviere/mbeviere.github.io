import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTitleHIComponent } from './work-title-hi.component';

describe('WorkTitleHIComponent', () => {
  let component: WorkTitleHIComponent;
  let fixture: ComponentFixture<WorkTitleHIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTitleHIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTitleHIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
