import { IonicStorageModule } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopoverController, AngularDelegate } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverPage } from './popover.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('PopoverPage', () => {
  let component: PopoverPage;
  let fixture: ComponentFixture<PopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [PopoverController, AngularDelegate],
      imports: [RouterTestingModule, HttpClientTestingModule, IonicStorageModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
