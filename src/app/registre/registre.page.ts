import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {

  @ViewChild('firstName') fn;
  @ViewChild('lastName') ln;
  @ViewChild('username') un;
  @ViewChild('password') pw;
  @ViewChild('birthDate') bd;
  
  constructor() { }

  ngOnInit() {
  }

  signUp(){
    console.log('Estoy en la funcion signUp() de registre.page.ts y tengo estos valores:',this.fn.value,this.ln.value,this.un.value,this.pw.value,this.bd.value)
  }

}
