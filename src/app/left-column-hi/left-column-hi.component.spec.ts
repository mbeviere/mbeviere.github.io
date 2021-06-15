import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftColumnHIComponent } from './left-column-hi.component';

describe('LeftColumnHIComponent', () => {
  let component: LeftColumnHIComponent;
  let fixture: ComponentFixture<LeftColumnHIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftColumnHIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftColumnHIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
