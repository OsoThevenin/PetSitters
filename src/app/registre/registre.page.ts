import { ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { AuthProviderService } from './../providers/auth/auth-provider.service';
import { GlobalService } from './../shared/global.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

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
      {type:'maxlength', message: 'First Name must be shorter than 25 characters.'}
    ],
    'lastName':[
      {type:'required', message: 'Last Name is required.'},
      {type:'pattern', message: 'Last Name must only contain uppercase and lowercase characters.'},
      {type:'maxlength', message: 'Last Name must be shorter than 25 characters.'}
    ],
    'username':[
      {type:'required', message: 'Username is required.'},
      {type:'maxlength', message: 'Username must be shorter than 25 characters.'}
    ],
    'password':[
      {type:'required', message: 'Password is required.'},
      {type:'minlength', message: 'Password length must be longer or equal than 6 characters.'},
      {type:'maxlength', message: 'Password must be shorter than 25 characters.'},
      {type:'pattern', message: 'Password must contain numbers, uppercase and lowercase characters.'}
    ],
    'confirm' :[
      {type:'required', message: 'Confirm password is required.'},
      {type:'equalTo', message: 'Password mismatch.'}
    ],
    'birthDate':[
      {type:'required', message: 'Birth Date is required.'}
    ],
    'city':[
      {type:'required', message: 'City is required.'},
      {type:'pattern', message: 'City must be valid.'},
      {type:'maxlength', message: 'City must be shorter than 25 characters.'},
    ],
    'email':[
      {type:'required', message: 'Email is required.'},
      {type:'pattern', message: 'Email must be valid.'}
    ],
  };

  @ViewChild('firstName') fn;
  @ViewChild('lastName') ln;
  @ViewChild('username') un;
  @ViewChild('password') pw;
  @ViewChild('city') ct;
  @ViewChild('birthDate') bd;
  @ViewChild('email') em;

  constructor(private router: Router, public formBuilder: FormBuilder,
    private http: HttpClient, private global: GlobalService,
    private auth: AuthProviderService, private toastController: ToastController) {

    this.signUpForm = this.formBuilder.group({
      fnfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[A-ZΆ-ΫÀ-ÖØ-Þa-zά-ώß-öø-ÿ ]+$') 
      ])),
      lnfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[A-ZΆ-ΫÀ-ÖØ-Þa-zά-ώß-öø-ÿ ]+$') 
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
      pw2fc: new FormControl('', [Validators.required, this.equalto('pwfcn')]),
      bdfcn: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      ctfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^([a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+)$')
      ])),
      emfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((?!(^[.-].*|[^@]*[.-]@|.*\\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~.-]+@)(?!-.*|.*-\\.)([a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,15})$")
      ]))
    });

  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
    if(!isValid) 
    return { 'equalTo': {isValid} }
    else 
    return null;
    };
  }


  ngOnInit() {
  }

  // Register a new User with the information provided
  signUp() {
    let dia = this.bd.value.substring(8,10);
    let mes = this.bd.value.substring(4,7);
    let any = this.bd.value.substring(0,4);
    let b = dia.concat(mes,'-',any);
    const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + this.pw.value);
    const body: any = {
      firstName: this.fn.value,
      lastName: this.ln.value,
      username: this.un.value,
      password: hashPassword,
      birthdate: b,
      city: this.ct.value,
      email: this.em.value
    };
    console.log(body);
    this.auth.register(body)
      .subscribe(res => {
        // When the result is okay
        console.log(res);
        this.router.navigateByUrl('/email-confirm/' + body.username);
        this.presentToast('SignedUp successfully!');
        },
        err => {
          const error: HttpErrorResponse = err;
          console.log(JSON.stringify(error));
          if (error.status === 400) {
            this.presentToast('Username or email already exists. Please Log In or try it again');
          } else if (error.status === 500) {
            this.presentToast('Something went wrong, please try it again');
          }
      });
  }
  // Navigates to Login Page
  goSignIn() {
    this.router.navigateByUrl('/login');
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
