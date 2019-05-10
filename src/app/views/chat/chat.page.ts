import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';

const STORAGE_KEY = 'my_images';

const PETSITTERS_DIRECTORY = 'PetSitters';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  images = [];

  constructor(private file: File, private platform: Platform, private webview: WebView,
    private toastController: ToastController, private storage: Storage,
    private ref: ChangeDetectorRef,  private router: Router,
    private cameraService: CameraService) {  }

  ngOnInit() {
    // Carregar images guardades
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
  }

  goBack() {
    this.router.navigateByUrl('/tabs/chats');
  }
  abrirCamara() {
    this.cameraService.selectImage();
    console.log("Juntar con lo de Pere")
  }
  goProfile() {
    console.log("voyprofile")
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
      this.file.removeFile(correctPath, imgEntry.name).then(res => {
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
}
