import { AuthProviderService } from './../providers/auth/auth-provider.service';
import { GlobalService } from './../shared/global.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    console.log('Registre signUp operation');
    this.auth.signUp(this.body);
  }
}
