import { ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviderService } from './../../providers/auth/auth-provider.service';
import { ChatsService } from './../../providers/chats/chats.service';
import { throwError } from 'rxjs';
import { bindPlayerFactory } from '@angular/core/src/render3/styling/player_factory';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {
  public words: Array<string> = ["Delete"]
  images = [];
  error: any = 'Sense error';
  activeChats = [];

  constructor(private toastController: ToastController, private router: Router, private auth: AuthProviderService, private chats: ChatsService, 
    private alertController: AlertController) { }
    

    data = [
      {username: "Pere"},
      {username: "David"},
      {username: "Hector"},
      {username: "Ruben"}
  ];

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  abreChat(chatUser) {
    this.router.navigateByUrl('/chat/' + chatUser);
  }

  borrarChat(chatUser){
    this.presentAlert_D(chatUser);
  }

  async presentAlert_D(chatUser) {
    const alert = await this.alertController.create({
      header: 'Delete chat',
      message: 'Are you sure you want to delete this chat?',
      
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: confirm => {
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
                    this.router.navigateByUrl('/tabs/chats');
                  }, err => {
                    console.log(err);
                    this.presentToast('Something went wrong, please try it again');
                  });
              }).catch(err => {
                  console.log(err);
                  return throwError;
                });
          }
        }
      ]
    });
    await alert.present();
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

translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,"es",token).subscribe(res => {
			this.words = res;
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.words;
}
}
