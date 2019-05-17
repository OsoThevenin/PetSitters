import { Storage } from '@ionic/storage';
import { File, FileReader } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera, private platform: Platform, private file: File,
    private webview: WebView, private storage: Storage, private actionSheetController: ActionSheetController) { }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  

}
