import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef,  private router: Router) {  }
    data = [
      {avatar: '../../../assets/default_avatar.png', mensaje: 'hey ther as,akefei fefwiefibh ew efi wiebhfihwih ef we fiwfi wi fw i e11111', nombre: 'user1'},
      {avatar: '../../../assets/default_avatar.png', mensaje: 'hey there2222', nombre: 'user2'},
      {avatar: '../../../assets/default_avatar.png', mensaje: 'hey ther333e', nombre: 'user3'},
      {avatar: '../../../assets/default_avatar.png', mensaje: 'hey ther444e', nombre: 'user4'},
  ];

  chatsUsuario = this.data;

  devuelveChatsUsuario(): any {
  return this.data;
  }

  abreChat(){
    this.router.navigateByUrl('/chat');
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}
