import { ChatsService } from './../../providers/chats/chats.service';
import { ImageService } from './../../services/image/image.service';
import { GlobalService } from './../../shared/global.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ToastController, NavController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthProviderService } from './../../providers/auth/auth-provider.service';
import { ImageCompressorService } from './../../services/compression.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ModalSolicitudPage } from './modal-solicitud/modal-solicitud.page';
import { throwError } from 'rxjs';

const STORAGE_KEY = 'my_images';
const PETSITTERS_DIRECTORY = 'PetSitters';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  ini: boolean = true;
  username: any;
  usernameCuidador: any;
  message = '';
  messages = [];
  id: any;
  @ViewChild('content') content: any;

  images = [];
  compression: ImageCompressorService = new ImageCompressorService();

  public contratado: boolean = false;

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef,  private router: Router,
    private auth: AuthProviderService , private actrout: ActivatedRoute,
    private nav: NavController, private actionSheetController: ActionSheetController,
    private camera: Camera, private imagePicker: ImagePicker, private imageService: ImageService,
    private chats: ChatsService, private modalController: ModalController, private alertController: AlertController)
    {}

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
  
    this.chats.hasContracted(this.usernameCuidador,token).subscribe(res =>{
      console.log(res);
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

  goBack() {
    clearInterval(this.id);
    this.router.navigateByUrl('/tabs/chats');
    
  }
  abrirCamara() {
    console.log('Open Camera');
    this.selectImage();
  }
  goProfile() {
    clearInterval(this.id);
    this.nav.navigateRoot(`tabs/chats/perfil-cuidador/` + this.usernameCuidador);
  }
  contratar(){
    //console.log("contrato")
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalSolicitudPage,
      componentProps: {
          usernameCuidador: this.usernameCuidador
      },
      cssClass: 'my-changePW-modal-css'
    });
    return await modal.present();
  }
  
  botonCancelar(){
    this.presentAlert_D();
  }


  async presentAlert_D() {
    const alert = await this.alertController.create({
      header: 'Cancel contract',
      message: 'Are you sure you want to cancel the contract?',
      
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: cancelar => {
            this.auth.getToken().then(result => {
              this.chats.rejectContract(this.usernameCuidador, result)
              .subscribe(res => {
                this.ngOnInit();
                this.presentToast('You have cancelled the contract successfully!');
              }, err => {
                this.presentToast('Something went wrong, please try again');
                console.log(err);
              });
            });
          }
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
          //console.log(res);
          let aux = res;
          if(aux.length > this.messages.length){
            this.messages = res;
            setTimeout(() => {
              this.content.scrollToBottom(0);
            });
          }
          });
      });
      if(this.ini && this.messages.length > 0){
        this.ini = false;
        setTimeout(() => {
          this.content.scrollToBottom(0);
        });
      }
    }.bind(this), 2000);
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
        this.content.scrollToBottom(0);
      });
    }
  }
  ionViewDidEnter(){
    this.content.scrollToBottom();
  }
  ionViewDidLeave(){
    clearInterval(this.id);
  }

  // FUNCIONALITATS DE CAMERA

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.openGallery();
        }
      },
      {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Get image',
        handler: () => {
          this.imageService.getImageData('hector_2019-05-15 14:41:44.592');
        }
      }]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: true,
        correctOrientation: true,
      };

      this.camera.getPicture(options).then(imagePath => {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let generatedName: string = this.createFileName();
        this.copyAndCompress(correctPath, currentName, generatedName).then((OutputDir: String) => {
          let file_name = this.imageService.uploadImageData(OutputDir);
          console.log(file_name);
        });
      });
    } else {
      console.log(`I'm not in cordova`);
    }
  }

  openGallery() {
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 100
    };
    this.imagePicker.hasReadPermission().then(res => {
      if (res === false) {
        this.requestReadPermission();
      } else {
        this.imagePicker.getPictures(options).then((results) => {
          for (let i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              let currentName = results[i].substring(results[i].lastIndexOf('/') + 1);
              let correctPath = results[i].substring(0, results[i].lastIndexOf('/') + 1);
              let generatedName:string = this.createFileName();
              this.copyAndCompress(correctPath, currentName, generatedName).then((OutputDir:string) => {
                console.log("UPLOADING IMAGE: " + OutputDir);
                this.imageService.uploadImageData(OutputDir);
              });
          }
        }, (err) => {
          this.presentToast('Error while opening the images');
        });
      }
    });
  }
  createFileName() {
    let d = new Date();
    let n = d.getTime();
    return (n + '.jpg');
  }


  async requestReadPermission() {
    this.imagePicker.requestReadPermission();
  }

  copyAndCompress(namePath, currentName, newFileName) {
    // Image Compression
    return new Promise((resolve, reject) => {
      let dataDirectory = this.file.externalRootDirectory + PETSITTERS_DIRECTORY + '/';
      let completePath: String = dataDirectory + newFileName;
      this.compression.compress(namePath + currentName).then((filePathOutput:string) => {
        let compressionDir = filePathOutput.substring(0, filePathOutput.lastIndexOf('/') + 1);
        let compressionFile = filePathOutput.substring(filePathOutput.lastIndexOf('/') + 1);
        this.file.removeFile(namePath, currentName).then(() => {this.file.removeFile(namePath, currentName)
          .catch(() => console.log('The temporal file has been successfully removed')); });
        this.file.moveFile(compressionDir, compressionFile, dataDirectory, newFileName).then(_ => {
        // Aquí s'ha de pujar les imatges a la memoria del telefon, amb la referencia del xat
        this.updateStoredImages(newFileName, completePath).then(() => resolve(completePath));
      }, error => {
        console.log('Error while storing the image: ' + error);
        this.presentToast('Error while storing the image');
        reject(error);
      });
    })
    .catch(() => {console.log('Failure when compressiong the image.'); });
    });
  }

}
