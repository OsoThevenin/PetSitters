import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginPage } from './login.page';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot(), RouterTestingModule,
        FormsModule, ReactiveFormsModule, IonicModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.logInForm.valid).toBeFalsy()
  });

  it('username field validity', () => {
    let errors = {};
    let username = component.logInForm.controls['unfcn'];
    
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    username.setValue('something');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.logInForm.controls['pwfcn'];
    
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('something');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });
});
