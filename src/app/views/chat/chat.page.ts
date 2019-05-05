import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  missatge: String = "";
  missatges = [];

constructor( private router: Router) { 
  this.getMissatges();
}

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('/tabs/chats');
  }
  abrirCamara(){
    console.log("Juntar con lo de Pere")
  }
  goProfile(){
    console.log("voyprofile")
  }
  contratar(){
    console.log("contrato")
  }

  getMissatges(){
    console.log("cdemano missatges")
  }

  enviaMissatge(){
    console.log(this.missatge);
  }
}