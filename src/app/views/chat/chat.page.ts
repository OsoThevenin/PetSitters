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
  @ViewChild('content') content: any;

  images = [];

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef,  private router: Router,
    private auth: AuthProviderService , private actrout: ActivatedRoute,
    private nav: NavController) { this.getMissatges(); }

  ngOnInit() {
    // Carregar images guardades
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
    this.auth.getUsername().then(user =>{
      this.username = user;
      this.messages = [
        {message: 'hola', user: 'user2'},
        {message: 'bon dia', user: user},
        {message: 'que tal', user: 'user2'},
      ];
    });
    this.usernameCuidador = this.actrout.snapshot.paramMap.get('username');
    console.log(this.usernameCuidador );
  }

  goBack() {
    this.router.navigateByUrl('/tabs/chats');
  }
  abrirCamara() {
    //this.cameraService.selectImage();
    console.log("Juntar con lo de Pere")
  }
  goProfile() {
    this.nav.navigateRoot(`/perfil-cuidador/` + this.usernameCuidador);
  }
  contratar() {
    console.log("contrato")
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
