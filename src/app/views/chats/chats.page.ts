import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ChatsService } from 'src/app/providers/chats/chats.service';
import { throwError } from 'rxjs';
import { bindPlayerFactory } from '@angular/core/src/render3/styling/player_factory';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {
  images = [];
  error: any = 'Sense error';
  activeChats = [];

  constructor(private toastController: ToastController, private router: Router, private auth: AuthProviderService, private chats: ChatsService) { }
    

    data = [
      {username: "Pere"},
      {username: "David"},
      {username: "Hector"},
      {username: "Ruben"}
  ];

  abreChat(chatUser){
    this.router.navigateByUrl('/chat/' + chatUser);
  }

  borrarChat(chatUser){
    const data: any = {
      otherUsername: chatUser
    };
    this.auth.getToken().then(result => {
      const token = result;
      //console.log('token: ' + token);
      this.chats.deleteChat(data, token).
          subscribe(res => {
            console.log(res);
            this.ngOnInit();
            this.presentToast('You have successfully deleted this chat');
          }, err => {
            console.log(err);
            this.presentToast('Something went wrong, please try it again');
          });
      }).catch(err => {
          console.log(err);
          return throwError;
        });
  }

  
  ngOnInit() {
    this.activeChats = this.showActiveChats();
    // Carregar images guardades
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  showActiveChats(): any {
    this.auth.getToken().then(result => {
      const token = result;
      this.chats.getActiveChats(token).subscribe(res => {
	      console.log(res);
	      this.activeChats = res;
	      //console.log(this.activeChats);
	    });
    }).catch(err => {
	    console.log(err);
	    return throwError;
    });
    return this.activeChats;
  }
}
