import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = '';
  messages = [
    {message: 'hola', user: 'user2'},
    {message: 'bon dia', user: 'me'},
    {message: 'que tal', user: 'user2'},
  ];

constructor( private router: Router) { 
  this.getMissatges();
}

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('/tabs/chats');
  }
  abrirCamara(){
    console.log('Juntar con lo de Pere')
  }
  goProfile(){
    console.log('voyprofile')
  }
  contratar(){
    console.log('contrato')
  }

  getMissatges(){
    console.log('demano missatges')
  }

  enviaMissatge(){
    console.log(this.message);
    this.messages.push({message: this.message, user: 'me'});
    this.message = '';
  }
}