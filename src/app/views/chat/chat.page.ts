import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

constructor( private router: Router) { }

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
}