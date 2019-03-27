import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrePage } from './registre.page';
import { IonicStorageModule } from '@ionic/storage';

describe('RegistrePage', () => {
  let component: RegistrePage;
  let fixture: ComponentFixture<RegistrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrePage ],
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
