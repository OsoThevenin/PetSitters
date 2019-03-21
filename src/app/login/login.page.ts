import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('username') un;
  @ViewChild('password') pw;
  
  constructor() { }

  ngOnInit() {
  }

  signIn(){
    console.log('Estoy en la funcion signIn() de login.page.ts y tengo estos valores:',this.un.value,this.pw.value)
  }
  goSignUp(){
  }
}
