import { GlobalService } from './../../../shared/global.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';



@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popoverController: PopoverController, private nav: NavController,
     private alertController: AlertController, private auth: AuthProviderService,
     private toastCtrl: ToastController, private global: GlobalService) { }

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

  DeleteProfile() {
    // Falta implementar el POST per esborrar l'usuari
    console.log("You click on Delete Profile");
    this.presentAlert();
    this.closePopover();
  }

  async presentAlert() {
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
              const data: any = {
                password: hashPassword
              };
              let bool = true;
              this.auth.deleteAccount(data).
              subscribe(res => {
                this.global.token = '';
                this.LogOut();
              }, err => {
                console.log(err);
                bool = false;
                this.presentToast('Something went wrong, please try it again');
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

