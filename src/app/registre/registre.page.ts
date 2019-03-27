import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {

  signUpForm: FormGroup;

  error_messages ={
    'firstName':[
      {type:'required', message: 'First Name is required.'},
      {type:'pattern', message: 'First Name must only contain uppercase and lowercase characters.'},
      {type:'maxLength', message: 'First Name must be shorter than 25 characters.'}
    ],
    'lastName':[
      {type:'required', message: 'Last Name is required.'},
      {type:'pattern', message: 'Last Name must only contain uppercase and lowercase characters.'},
      {type:'maxLength', message: 'Last Name must be shorter than 25 characters.'}
    ],
    'username':[
      {type:'required', message: 'Username is required.'},
      {type:'maxLength', message: 'Username must be shorter than 25 characters.'}
    ],
    'password':[
      {type:'required', message: 'Password is required.'},
      {type:'minLength', message: 'Password length must be longer or equal than 6 characters.'},
      {type:'maxLength', message: 'Password must be shorter than 25 characters.'},
      {type:'pattern', message: 'Password must contain numbers, uppercase and lowercase characters.'}
    ],
    'birthDate':[
      {type:'required', message: 'Birth Date is required.'},
      {type:'pattern', message: 'Birth Date must have a valid format (dd-mm-yyyy).'}
    ],
    'email':[
      {type:'required', message: 'Email is required.'},
      {type:'pattern', message: 'Email must be valid.'}
    ],
  }

  @ViewChild('firstName') fn;
  @ViewChild('lastName') ln;
  @ViewChild('username') un;
  @ViewChild('password') pw;
  @ViewChild('birthDate') bd;
  @ViewChild('email') em;

  constructor(private router: Router, public formBuilder: FormBuilder) { 
    this.signUpForm=this.formBuilder.group({
      fnfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z]+$') 
      ])),
      lnfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z]+$') 
      ])),
      unfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25), 
      ])),
      pwfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') 
      ])),
      bdfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)((1)(9)[0-9][0-9]|(2)(0)[0-5][0-9])$')
      ])),
      emfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });

  }

  ngOnInit() {
  }

  signUp(){
    console.log('Estoy en la funcion signUp() de registre.page.ts y tengo estos valores:',this.fn.value,this.ln.value,this.un.value,this.pw.value,this.bd.value,this.em.value)
  }
  goSignIn(){
    this.router.navigateByUrl('/login');
  }
}
