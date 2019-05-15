import { ImageService } from './../../services/image/image.service';
import { GlobalService } from './../../shared/global.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ImageCompressorService } from 'src/app/services/compression.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

const STORAGE_KEY = 'my_images';
const PETSITTERS_DIRECTORY = 'PetSitters';

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
  compression: ImageCompressorService = new ImageCompressorService();

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef,  private router: Router,
    private auth: AuthProviderService , private actrout: ActivatedRoute,
    private nav: NavController, private actionSheetController: ActionSheetController,
    private camera: Camera, private imagePicker: ImagePicker, private imageService: ImageService)
    {
        this.getMissatges();
    }

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
    console.log('Open Camera');
    this.selectImage();
  }
  goProfile() {
    this.nav.navigateRoot(`/perfil-cuidador/` + this.usernameCuidador);
  }
  contratar() {
    console.log("contrato");
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

  getMissatges() {
    console.log('demano missatges');
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
