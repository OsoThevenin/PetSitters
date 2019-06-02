import { GlobalService } from './../../../shared/global.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PopoverController, NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  notific: boolean;

  constructor(private popoverController: PopoverController, private nav: NavController,
     private alertController: AlertController, private auth: AuthProviderService,
     private toastCtrl: ToastController, private global: GlobalService,
     private modalController: ModalController, private storage: Storage) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  LogOut() {
    this.auth.logOut();
    this.nav.navigateRoot(`/login`);
    this.closePopover();
  }

  ChangePassword() {
    //console.log("Clic on Change Password")
    this.openModal();
  }

  ChangeToggleNotifications(){
    this.storage.set('toggle-notifications', this.notific);
  }
  
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-changePW-modal-css'
    });
    return await modal.present();
  }

  DeleteProfile() {
    this.presentAlert_D();
    this.closePopover();
  }

  async presentAlert_D() {
    const alert = await this.alertController.create({
      header: 'Delete Profile',
      message: 'Are you sure you want to delete your profile? Put your password to confirm this action.',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password', 
          type: 'password'
        }
      ],
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          // funcionalitat de esborar perfil
          handler: esborrar => {
            if (esborrar.password !== '') {
              const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + esborrar.password);
              console.log(hashPassword);
              const data: any = {
                password: hashPassword
              };
              let bool = true;
              this.auth.getToken().then(result => {
                const token = result;
                console.log('token: ' + token);
                this.auth.deleteAccount(data, token).
                    subscribe(res => {
                      this.global.token = '';
                      this.LogOut();
                    }, err => {
                      console.log(err);
                      bool = false;
                      this.presentToast('Something went wrong, please try it again');
                    });
              }).catch(err => {
                console.log(err);
                return throwError;
              });
              return bool;
            } else {
              this.presentToast('Password field cannot be empty');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }

}

