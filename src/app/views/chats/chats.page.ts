import { ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviderService } from './../../providers/auth/auth-provider.service';
import { ChatsService } from './../../providers/chats/chats.service';
import { throwError } from 'rxjs';
import { bindPlayerFactory } from '@angular/core/src/render3/styling/player_factory';
import { ImageService } from 'src/app/services/image/image.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {
  public words: Array<string> = ["Delete", 'Delete chat', 'Are you sure you want to delete this chat?', 'Cancel',
  'Confirm', 'You have successfully deleted this chat', 'Something went wrong, please try it again']
  images = [];
  error: any = 'Sense error';
  activeChats = [];

  constructor(private toastController: ToastController, private router: Router, private auth: AuthProviderService, private chats: ChatsService, 
    private alertController: AlertController, private ref: ChangeDetectorRef, private imageService: ImageService, private webview: WebView) { }
    

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
      header: this.words[1],
      message: this.words[2],
      
      buttons: [
        {
        text: this.words[3],
        role: 'cancel'
        },
        {
          text: this.words[4],
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
                    this.presentToast(this.words[5]);
                    this.router.navigateByUrl('/tabs/chats');
                  }, err => {
                    console.log(err);
                    this.presentToast(this.words[6]);
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
  actual_language: string;

  ngOnInit() {
  this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
      console.log(lang);
    }); 
	this.translate();
  this.activeChats = this.showActiveChats();
<<<<<<< HEAD
=======

>>>>>>> DevelopS4
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
        this.downloadProfileImages();
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
	this.auth.translate(this.words,this.actual_language,token).subscribe(res => {
			this.words = res;
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.words;
}

downloadProfileImages() {
  this.imageService.getToken().then((token) => {
    console.log('cuidadors: ' + JSON.stringify(this.activeChats));
    for (let profile of this.activeChats) {
      if(profile.profileImage !== null) {
        this.imageService.getImageData(profile.profileImage, token)
            .then((response) => {
              console.log('Imatge descarregada: ' + JSON.stringify(response));
              //let dataDirectory = this.file.externalApplicationStorageDirectory;
              //let url = dataDirectory + '/files/received/' + filename + '.jpg';

              let imagePath = this.webview.convertFileSrc(response.nativeURL);
              profile.profileImage = imagePath;

              console.log('imatge perfil actualitzada');
            }).catch((err) => {
              console.log('error al descarregar imatge de perfil de cuidador ' + profile.name);
            });
      }
    }
    this.ref.detectChanges();
  });
}
}
