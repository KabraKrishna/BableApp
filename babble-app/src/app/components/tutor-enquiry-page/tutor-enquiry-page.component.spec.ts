import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorEnquiryPageComponent } from './tutor-enquiry-page.component';

describe('TutorEnquiryPageComponent', () => {
  let component: TutorEnquiryPageComponent;
  let fixture: ComponentFixture<TutorEnquiryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorEnquiryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorEnquiryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
