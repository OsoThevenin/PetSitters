import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ToastController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';


const STORAGE_KEY = 'my_images';

const PETSITTERS_DIRECTORY = 'PetSitters';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ChatsService } from 'src/app/providers/chats/chats.service';



import { ModalSolicitudPage } from './modal-solicitud/modal-solicitud.page';
import { ModalController, AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  username: any;
  usernameCuidador: any;
  message = '';
  messages = [];
  id: any;
  @ViewChild('content') content: any;

  images = [];

  public contratado: boolean = false;

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef,  private router: Router,
    private auth: AuthProviderService , private actrout: ActivatedRoute,
    private nav: NavController, private chats: ChatsService, private modalController: ModalController,
    private alertController: AlertController) {}

  ngOnInit() {
    // Carregar images guardades
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
    this.auth.getUsername().then(user =>{
      this.username = user;
    });
    this.usernameCuidador = this.actrout.snapshot.paramMap.get('username');
    console.log(this.usernameCuidador );

    this.auth.getToken().then(result => {
      const token = result;
  
    this.chats.isContracted(this.usernameCuidador,token).subscribe(res =>{
      if(res!=null) this.contratado=true;
    });
  
    }).catch(err => {
      console.log(err);
     return throwError;
    });

    this.getMissatges();
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });
  }


  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 20);
  }

  goBack() {
    this.router.navigateByUrl('/tabs/chats');
    clearInterval(this.id);
  }
  abrirCamara() {
    //this.cameraService.selectImage();
    console.log("Juntar con lo de Pere")
  }
  goProfile() {
    this.nav.navigateRoot(`/perfil-cuidador/` + this.usernameCuidador);
  }
  contratar(){
    //console.log("contrato")
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalSolicitudPage,
      cssClass: 'my-changePW-modal-css'
    });
    return await modal.present();
  }
  
  cancelar(){
    this.presentAlert_D();
  }


  async presentAlert_D() {
    const alert = await this.alertController.create({
      header: 'Cancel contract',
      message: 'Are you sure you want to can the contract?',
      
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          // funcionalitat de cancelar contracte
        }
      ]
    });

    await alert.present();
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.externalRootDirectory + PETSITTERS_DIRECTORY + '/' + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  updateStoredImages(name, filePath) { // FilePath contains the complete path + name of the image
    return new Promise((resolve) => {   
      this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        if (!arr) {
          let newImages = [name];
          this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
          arr.push(name);
          this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }

        let resPath = this.pathForImage(filePath);

        let newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
        };

        this.images.push(newEntry);
        console.log(this.images.length);
        this.ref.detectChanges(); // trigger change detection cycle        
      }).then(() => resolve());
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      let correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
      this.file.removeFile(correctPath, imgEntry.name).then(() => {
        this.presentToast('Image correctly removed');
      });
    });
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  getMissatges(){
    console.log('demano missatges');
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });
    this.id = setInterval(function(){
      this.auth.getToken().then(result => {
        const token = result;
        this.chats.getMessagesFromChat(this.usernameCuidador, token).subscribe(res => {
          console.log(res);
          let aux = res;
          if(aux.length > this.messages.length){
            this.messages = res;
          }
          });
      });
      setTimeout(() => {
        this.content.scrollToBottom(0);
      });
    }.bind(this), 1000);
  }

  enviaMissatge(){ 
    if (this.message !== ''){
      this.auth.getToken().then(result => {
        const token = result;
        console.log(token);
        let body = {
          content: this.message,
          isMultimedia: false,
          userWhoReceives: this.usernameCuidador
        };
        console.log(body);
        this.chats.sendMessage(body,token).subscribe(res => {},err => {console.log(err)});
        console.log("en teoria ha enviao");
        this.messages.push({content: this.message,
                            multimedia: false,
                            userWhoReceives: this.usernameCuidador,
                            userWhoSends: this.username,
                            visible: true,
                            whenSent: ""});
      this.message = '';
      setTimeout(() => {
        this.content.scrollToBottom(0);
      });
      }, err =>{
        console.log(err);
      }).catch(err => {
        console.log(err);
      });
      console.log(this.messages);
      setTimeout(() => {
        this.content.scrollToBottom(200);
      });
    }
  }
  ionViewDidEnter(){
    this.content.scrollToBottom();
  }

}
