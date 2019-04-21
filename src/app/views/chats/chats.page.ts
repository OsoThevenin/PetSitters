import { Component } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})
export class ChatsPage {

constructor( private router: Router) { }

  data = [
    {avatar:'../../../assets/default_avatar.png', mensaje:'hey ther as,akefei fefwiefibh ew efi wiebhfihwih ef we fiwfi wi fw i e11111', nombre:'user1'},
    {avatar:'../../../assets/default_avatar.png', mensaje:'hey there2222', nombre:'user2'},
    {avatar:'../../../assets/default_avatar.png', mensaje:'hey ther333e', nombre:'user3'},
    {avatar:'../../../assets/default_avatar.png', mensaje:'hey ther444e', nombre:'user4'},
];

  chatsUsuario=this.data;

 

  devuelveChatsUsuario(): any{
    
  return this.data;
  }

  abreChat(){
    this.router.navigateByUrl('/chat');
  }
}
