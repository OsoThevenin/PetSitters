import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrePage } from './registre.page';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrePage', () => {
  let component: RegistrePage;
  let fixture: ComponentFixture<RegistrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrePage ],
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot(), FormsModule,
        ReactiveFormsModule, RouterTestingModule, IonicModule],
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

  it('form should be invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy()
  });

  it('firstName field validity', () => {
    let errors = {};
    let firstName = component.signUpForm.controls['fnfcn'];
    
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    firstName.setValue('abcabcabcabcabcabcabcabcabc');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();

    firstName.setValue('Pasd1kjl332.-');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
  });

  it('lastName field validity', () => {
    let errors = {};
    let lastName = component.signUpForm.controls['lnfcn'];
    
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    lastName.setValue('abcabcabcabcabcabcabcabcabc');
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();

    lastName.setValue('Pasd1kjl332.-');
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    lastName.setValue('Bruy Vilalta');
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('username field validity', () => {
    let errors = {};
    let username = component.signUpForm.controls['unfcn'];
    
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    username.setValue('abcabcabcabcabcabcabcabcabc');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.signUpForm.controls['pwfcn'];
    
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('abcabcabcabcabcabcabcabcabc');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    password.setValue('hola');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['pattern']).toBeTruthy();

    password.setValue('holapepito');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    password.setValue('holapepito9');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    password.setValue('Holapepito');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    password.setValue('Holapepito9');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('birthday field validity', () => {
    let errors = {};
    let birthday = component.signUpForm.controls['bdfcn'];

    errors = birthday.errors || {};
    expect(errors['required']).toBeTruthy();

    birthday.setValue('13/09/97');
    errors = birthday.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    birthday.setValue('13-09-97');
    errors = birthday.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    birthday.setValue('13-09-1997');
    errors = birthday.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.signUpForm.controls['emfcn'];

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  })
});
