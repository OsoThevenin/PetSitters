import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
import { GlobalService } from './../../shared/global.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PETSITTERS_DIRECTORY = 'PetSitters';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: Storage, private transfer: FileTransfer, private file: File,
    private global: GlobalService, private toastController: ToastController) { }

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

    return fileTransfer.upload(file, encodeURI(uri), options)
     .then((data) => {
        // success
        this.presentToast('The image has been successfully uploaded');
        console.log('Response: ' + JSON.stringify(data));
     }, (err) => {
        // error
        this.presentToast('An error has occurred');
        console.log('Error: ' + JSON.stringify(err));
     });
  }

  getImageData(name: string) {
    // Send HTTP GET to api
    const token = this.storage.get('token');
    token.then(res => {
       this.getImage(name, res);
    }).catch(err => {
      console.log('Error when getting token' + err);
    });
  }

  async getImage(name: string, token: string) {
    const fileTransfer: FileTransferObject = new FileTransferObject();
    let dataDirectory = this.file.externalRootDirectory + PETSITTERS_DIRECTORY + '/';
    let options: FileUploadOptions = {
      headers: {
       'Access-Control-Allow-Origin': '*',
       'Authorization': 'Bearer ' + token
      },
      mimeType: 'image/jpeg'
   };

    let url = this.global.baseUrl;
    fileTransfer.download(url + 'get/' + name, dataDirectory + 'received/' + name + '.jpg', true, options)
    .then((res) => {
      console.log('download complete:' + res.toURL());
    }, (error) => {
      console.log(JSON.stringify(error));
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
}
