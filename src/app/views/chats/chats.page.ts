import { GlobalService } from './../../shared/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {
  images = [];
  error: any = 'Sense error';

  constructor(private camera: Camera, private transfer: FileTransfer, private file: File, private platform: Platform,
    private actionSheetController: ActionSheetController, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef, private loadingController: LoadingController,
    private imagePicker: ImagePicker, private http: HttpClient, private global: GlobalService, private router: Router) { }

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
  
  ngOnInit() {
    // Carregar images guardades
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
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
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        console.log('Image path:' + JSON.stringify(imagePath) + 'correctPath:' + JSON.stringify(correctPath));
        this.uploadImageData(imagePath);
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
      quality: 75
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
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              this.uploadImageData(results[i]);
          }
        }, (err) => {
          this.presentToast('Error while opening the images');
        });
      }
    });
  }

  async requestReadPermission() {
    this.imagePicker.requestReadPermission();
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(_ => {
      console.log(`imatge guardada a l'emmegatzematge intern del dispositiu`);
      this.updateStoredImages(newFileName);
    }, error => {
      console.log('Error while storign the image: ' + error);
      this.presentToast('Error while storign the image');
    });
  }

  createFileName() {
    let d = new Date();
    let n = d.getTime();
    return (n + '.jpg');
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images.push(newEntry);
      console.log(this.images.length);
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      let correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('Image correctly removed');
      });
    });
  }

  async upload(file: any, token: any) {
    const fileTransfer: FileTransferObject = new FileTransferObject();
    let filename = file.substring(file.lastIndexOf('/') + 1);
    console.log('FileName from URI: ' + filename);
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: filename,
       headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
       },
       mimeType: 'image/jpeg'
    };
    let uri = this.global.baseUrl + 'store';
    fileTransfer.upload(file, encodeURI(uri), options)
     .then((data) => {
        // success
        this.presentToast('The image has been successfully uploaded');
        console.log('Response: ' + data);
     }, (err) => {
        // error
        this.presentToast('An error has occurred');
        console.log('Error: ' + JSON.stringify(err));
     });
  }

  uploadImageData(file: any) {
    // Send HTTP post to API
    const token = this.storage.get('token');
    token.then(res => {
      this.upload(file, res);
    }).catch(err => {
      console.log('Error when getting token' + err);
    });
  }
}
