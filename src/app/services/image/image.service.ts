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

  getToken() {
    return this.storage.get('token');
  }

  uploadImageData(file: any, token: any) {
    // Send HTTP post to API
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
    return fileTransfer.upload(file, encodeURI(uri), options);
  }

  uploadProfileImage(file: any, token: any) {
    // Send HTTP post to API
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
    let uri = this.global.baseUrl + 'setProfileImage';
    return fileTransfer.upload(file, encodeURI(uri), options);
  }

  getImageData(name: string, token: any) {
    // Send HTTP GET to api
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
    return fileTransfer.download(url + 'get/' + name, dataDirectory + 'received/' + name + '.jpg', true, options);
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
