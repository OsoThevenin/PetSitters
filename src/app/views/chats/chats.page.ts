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
import { ImageCompressorService } from '../../services/compression.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

const STORAGE_KEY = 'my_images';

const PETSITTERS_DIRECTORY = 'PetSitters';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})

export class ChatsPage implements OnInit {
  images = [];
  compression:ImageCompressorService = new ImageCompressorService();

  constructor(private camera: Camera, private transfer: FileTransfer, private file: File, private platform: Platform,
    private actionSheetController: ActionSheetController, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef, private loadingController: LoadingController,
    private imagePicker: ImagePicker, private http: HttpClient, private global: GlobalService, private router: Router) {  }
  
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

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
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
        let generatedName:string = this.createFileName();
        this.copyAndCompress(correctPath, currentName, generatedName).then((OutputDir:String) => {
          this.uploadImageData(OutputDir);
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
                console.log("UPLOADING IMAGE:: " + OutputDir);
                this.uploadImageData(OutputDir);
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
      let completePath:String = dataDirectory + newFileName;
      this.compression.compress(namePath + currentName).then((filePathOutput:string) => {     
        let compressionDir = filePathOutput.substring(0, filePathOutput.lastIndexOf('/') + 1);
        let compressionFile = filePathOutput.substring(filePathOutput.lastIndexOf('/') + 1);
        this.file.removeFile(namePath, currentName).then(()=>{this.file.removeFile(namePath, currentName).catch(() => console.log("The temporal file has been successfully removed"));})       
        this.file.moveFile(compressionDir, compressionFile, dataDirectory, newFileName).then(_ => {      
        this.updateStoredImages(newFileName, completePath).then(() => resolve(completePath));
      }, error => {
        console.log('Error while storing the image: ' + error);
        this.presentToast('Error while storing the image');
        reject(error);
      });
    })
    .catch(() => {console.log("Failure when compressiong the image.")});
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
      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('Image correctly removed');
      });
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
}