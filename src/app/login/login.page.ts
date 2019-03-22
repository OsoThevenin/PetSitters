import { AuthProviderService } from './../providers/auth/auth-provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  
  constructor(private auth: AuthProviderService) { }

  ngOnInit() {
  }

  signIn(){
    console.log('Estoy en la funcion signIn() de login.page.ts y tengo estos valores:',this.username,this.password);
    const body: any = {
      username: this.username,
      password: this.password
    };
    this.auth.logIn(body);
  }
}
