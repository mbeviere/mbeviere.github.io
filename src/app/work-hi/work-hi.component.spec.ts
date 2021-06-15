import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHiComponent } from './work-hi.component';

describe('WorkHiComponent', () => {
  let component: WorkHiComponent;
  let fixture: ComponentFixture<WorkHiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkHiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
