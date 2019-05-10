import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ChatsService } from 'src/app/providers/chats/chats.service';
import { throwError } from 'rxjs';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {
  images = [];
  error: any = 'Sense error';
  activeChats = [];

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef, private loadingController: LoadingController,
    private imagePicker: ImagePicker, private http: HttpClient, private global: GlobalService, private router: Router, private auth: AuthProviderService, private chats: ChatsService) { }
    

    data = [
      {username: "Pere"},
      {username: "David"},
      {username: "Hector"},
      {username: "Ruben"}
  ];

  abreChat(chatUser){
    this.router.navigateByUrl('/chat/' + chatUser);
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
      console.log('token: ' + token);
      const token = result;
	    this.chats.getActiveChats(token).subscribe(res => {
	      //console.log(res);
	      this.activeChats = res;
	      //console.log(this.activeChats);
	    });
    }).catch(err => {
	    console.log(err);
	    return throwError;
  return this.activeChats;
	  });
  }
}
