import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('username') un;
  @ViewChild('password') pw;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    console.log('Estoy en la funcion signIn() de login.page.ts y tengo estos valores:',this.un.value,this.pw.value)
  }
  goSignUp(){
    this.router.navigateByUrl('/registre');
  }
}
