import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popoverController: PopoverController, private nav: NavController, public alertController: AlertController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  LogOut() {
    // Falta combinar amb la part del Pere
    console.log("You click on Log out");
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
            if (esborrar.password == '') {
              // a mes a mes comprovar que es correcte el password
              console.log('No has posat el Password');
            }
            console.log('You click on Confirm button');
          }
        }
      ]
    });

    await alert.present();
  }

}
