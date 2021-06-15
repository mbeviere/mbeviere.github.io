import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailHiComponent } from './document-detail-hi.component';

describe('DocumentDetailHiComponent', () => {
  let component: DocumentDetailHiComponent;
  let fixture: ComponentFixture<DocumentDetailHiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDetailHiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailHiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
