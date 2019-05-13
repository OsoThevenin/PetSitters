import { Component } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPage {

  x = this.getContracts();

  constructor( private toastCtrl: ToastController, private auth: AuthProviderService) {
  }

  getContracts() {
    this.auth.getToken().then(result => {
      const token = result;

     this.auth.getReceivedContracts(token).subscribe(res => {
       console.log(res);
      });
    }).catch(err => {
      console.log(err);
     return throwError;
    });
    return "pruebaDANIEL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
  }

  accept(){
    this.auth.getToken().then(result => {
      const data: any = {
        //username: username
      };
      this.auth.acceptContract(data, result)
      .subscribe(res => {
        this.presentToast('You have accepted the contract successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
        console.log(err);
      });
    });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }
}
