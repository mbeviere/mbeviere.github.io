import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondScatterComponent } from './second-scatter.component';

describe('SecondScatterComponent', () => {
  let component: SecondScatterComponent;
  let fixture: ComponentFixture<SecondScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
