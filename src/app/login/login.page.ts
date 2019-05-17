import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthProviderService } from './../providers/auth/auth-provider.service';
import { GlobalService } from './../shared/global.service';
import {Md5} from 'ts-md5/dist/md5';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  unValid = true;
  pwValid = true;
  logInForm: FormGroup;
  error_messages = {
    'username': [
      {type: 'required', message: 'Username is required.'},
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
    ]
  };
  @ViewChild('username') un;
  @ViewChild('password') pw;
  constructor(private auth: AuthProviderService, private storage: Storage, private router: Router,
    private toastController: ToastController, private formBuilder: FormBuilder, private global: GlobalService ) {
      this.storage.get('token').then((val) => {
        if (val !== null) {
          this.router.navigateByUrl('');
        }
      });
      this.logInForm = this.formBuilder.group({
        unfcn: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        pwfcn: new FormControl('', Validators.compose([
          Validators.required,
        ]))
      });
    }

  ngOnInit() {
  }

  // Login a username with the information provided
  signIn() {
    if (this.logInForm.valid) {
      // Hash password
      const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + this.pw.value);
      const body: any = {
        username: this.un.value,
        password: hashPassword
      };
      this.auth.login(body)
        .subscribe(res => {
          // Save token to storage
          if (res.result == null) this.presentToast('Please confirm your email!');
          console.log('result ' + JSON.stringify(res));
          this.storage.set('token', res.result.token);
          this.storage.set('username', this.un.value);
          this.global.token = res.result.token;
          this.router.navigateByUrl('');
        }, err => {
          console.log(err);
          if (err.status === 401) {
            this.presentToast('Bad credentials, please try again!');
          } else if (err.status === 500) {
            this.presentToast("Something went wrong, we can't sign you in. Please try sign up first!");
          } else {
            this.presentToast('Something went wrong');
          } 
        });
    } else {
      if (!this.logInForm.controls['unfcn'].valid) {
        this.unValid = false;
      }
      if (!this.logInForm.controls['pwfcn'].valid) {
        this.pwValid = false;
      }
    }
  }

  // Navigate to Register Page
  goSignUp() {
    this.router.navigateByUrl('/registre');
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
