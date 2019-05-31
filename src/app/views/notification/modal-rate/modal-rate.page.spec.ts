import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRatePage } from './modal-rate.page';

describe('ModalRatePage', () => {
  let component: ModalRatePage;
  let fixture: ComponentFixture<ModalRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
