import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentZoomHiComponent } from './document-zoom-hi.component';

describe('DocumentZoomHiComponent', () => {
  let component: DocumentZoomHiComponent;
  let fixture: ComponentFixture<DocumentZoomHiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentZoomHiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentZoomHiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
