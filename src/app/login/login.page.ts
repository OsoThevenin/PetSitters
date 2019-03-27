import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthProviderService } from './../providers/auth/auth-provider.service';
import {Md5} from 'ts-md5/dist/md5';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('username') un;
  @ViewChild('password') pw;
  constructor(private auth: AuthProviderService, private storage: Storage, private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  // Login a username with the information provided
  signIn() {
    // Hash password
    const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + this.pw.value);
    const body: any = {
      username: this.un.value,
      password: hashPassword
    };
    this.auth.login(body)
      .subscribe(res => {
        // Save token to storage
        console.log(res);
        this.storage.set('token', res.result.token);
        this.router.navigateByUrl('');
      }, err => {
        if (err.status === 401) {
          this.presentToast('Bad credentials, please try again!');
        }
      });
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
