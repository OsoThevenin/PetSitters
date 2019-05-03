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
    private imagePicker: ImagePicker, private http: HttpClient, private global: GlobalService) { }

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

  // When we want to send the picture to the api
  /*async startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry)
    .then(entry => {
      this.presentToast('Reading file...');
      (<FileEntry>entry).file(file => this.uploadImageData(file));
    }).catch(error => {
      this.presentToast('Error while reading the file');
    });
  }*/

  upload(file: any, token: any) {
    const fileTransfer: FileTransferObject = new FileTransferObject();
    let filename = file.substring(file.lastIndexOf('/') + 1);
    console.log('FileName from URI: ' + filename);
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: filename,
       headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       },
       mimeType: 'image/jpeg'
    };
    let uri = this.global.baseUrl + 'store';
    fileTransfer.upload(file, encodeURI(uri), options)
     .then((data) => {
        // success
        this.error = JSON.stringify(data);
        this.presentToast('Successfullly');
        console.log('Response: ' + data);
     }, (err) => {
        // error
        this.error = JSON.stringify(err);
        console.log('Hi ha un error tet');
        this.presentToast('Terrible error: ' + JSON.stringify(err));
        console.log('Error: ' + JSON.stringify(err));
     });
  }

  /*readFile(fileIncoming: any) {
    console.log("Nom fitxer: " + JSON.stringify(fileIncoming));
    //const blb    = new Blob(["Lorem ipsum sit"], {type: "text/plain"});
    /*reader.onloadend = function() {
      var text = console.log("result read: " + text);
      console.log(text);
      const formData = new FormData();
      formData.append('file', blb, fileIncoming);
      self.presentToast('Uploading file...');
      self.uploadImageData(formData);
    };*/

    /*

    reader.onloadend = () => {
      console.log('Reader result: ' + JSON.stringify(reader.result));
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: fileIncoming.type
      });
      formData.append('file', imgBlob, fileIncoming.name);
      this.uploadImageData(formData);
    };


    // reader.readAsText(blb);
    reader.readAsText(fileIncoming);


  var formData = {
    file: createReadStream(fileIncoming.localURL),
  };

  this.uploadImageData(formData);
}*/

  uploadImageData(file: any) {
    // Send HTTP post to API
    const token = this.storage.get('token');
    token.then(res => {
      this.upload(file, res);
    }).catch(err => {
      console.log('Error when getting token' + err);
    });
  }

  async sendApiRequest(formData: any, token) {
    const loading = await this.loadingController.create({
      message: 'Sending image...',
      spinner: 'bubbles',
      duration: 2000
    });
    await loading.present();

    let body: any = {
      formData: FormData
    };
    console.log('Token:' + token);
    let httpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    httpHeaders = httpHeaders.append('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    const options = {headers: httpHeaders, withCredentials: true};

    this.presentToast('Posting...');
    this.http.post(this.global.baseUrl + 'store', body, options)
      .subscribe(res => {
          // SUCCESS YEAH
          this.error = JSON.stringify(res);
          this.presentToast('Successfullly');
          console.log('Response: ' + res);
      }, err => {
        this.error = JSON.stringify(err);
        console.log('Hi ha un error tet');
        this.presentToast('Terrible error: ' + JSON.stringify(err));
        console.log('Error: ' + JSON.stringify(err));
      });
  }
}
