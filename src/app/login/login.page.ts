import { Storage } from '@ionic/storage';
import { AuthProviderService } from './../providers/auth/auth-provider.service';
import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private secureKey: string;
  private secureIV: string;
  username: string = '';
  password: string = '';
  constructor(private auth: AuthProviderService, private storage: Storage) { }

  ngOnInit() {
  }

  signIn() {
    console.log('Estoy en la funcion signIn() de login.page.ts y tengo estos valores:', this.username, this.password);
    // Hash password
    const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + this.password);
    console.log(hashPassword);
    const body: any = {
      username: this.username,
      password: hashPassword
    };
    this.auth.login(body)
      .subscribe(res => {
        // Save token to storage
        console.log(res);
        this.storage.set('token', 'token1');
      });
  }
}
