import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack(){
    console.log("atras")
  }
  goProfile(){
    console.log("voyprofile")
  }
  contratar(){
    console.log("contrato")
  }
}
