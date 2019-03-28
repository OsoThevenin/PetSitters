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
     private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  LogOut() {
    this.auth.logOut();
    this.nav.navigateForward(`/login`);
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
              const data: any = {
                password: esborrar.password
              };
              this.auth.deleteAccount(data).
              subscribe(res => {
                this.nav.navigateForward(`/registre`);
                return true;
              }, err => {
                console.log(err);
                return false;
              });
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
      duration: 2000
    });
    await toast.present();
  }

}

