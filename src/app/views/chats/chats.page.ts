import { Component } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})
export class ChatsPage {

  chatsUsuario=this.devuelveChatsUsuario()

  devuelveChatsUsuario(): any{
    console.log("hola2")
    return 
  }

  abreChat(){
    console.log("hola")

  }
}
