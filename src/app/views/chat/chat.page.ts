import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';


@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  username: any;
  message = '';
  messages = [];
  @ViewChild('content') content: any;

constructor( private router: Router, private auth: AuthProviderService) {
  this.getMissatges();
}

  ngOnInit() {
    this.auth.getUsername().then(user =>{
      this.username = user;
      this.messages = [
        {message: 'hola', user: 'user2'},
        {message: 'bon dia', user: user},
        {message: 'que tal', user: 'user2'},
      ];
    });
    
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
    console.log(this.messages);
    if (this.message !== ''){
      this.messages.push({message: this.message, user: this.username});
      this.message = '';
      this.content.scrollToBottom();
    }
  }
  ionViewDidEnter(){
    this.content.scrollToBottom();
  }

}