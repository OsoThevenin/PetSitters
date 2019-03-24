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
    birthdate: ''
  };
  constructor(private http: HttpClient, private global: GlobalService,
    private auth: AuthProviderService) { }

  ngOnInit() {
  }

  signUp() {
    console.log('Registre signUp operation ' + this.body.password);
    const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + this.body.password);
    console.log(hashPassword);
    this.body.password = hashPassword;
    console.log(this.body);
    this.auth.register(this.body)
      .subscribe(res => {
        console.log(res);
      });
  }
}
