import { AuthProviderService } from './../providers/auth/auth-provider.service';
import { GlobalService } from './../shared/global.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {
  body: any = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    birthdate: '',
    email: 'email@email.com'
  };
  constructor(private http: HttpClient, private global: GlobalService,
    private auth: AuthProviderService) { }

  ngOnInit() {
  }

  signUp() {
    const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + this.body.password);
    this.body.password = hashPassword;
    this.auth.register(this.body)
      .subscribe(res => {
        console.log(res);
      });
  }
}
