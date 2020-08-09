import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternEnrollComponent } from './intern-enroll.component';

describe('InternEnrollComponent', () => {
  let component: InternEnrollComponent;
  let fixture: ComponentFixture<InternEnrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternEnrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
