import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPage implements OnInit  {
  
  contracts: any;

  constructor( private toastCtrl: ToastController, private auth: AuthProviderService) {
  }

  ngOnInit() {
    this.getContracts();
  }

  getContracts() {
    this.auth.getToken().then(result => {
      const token = result;
     this.auth.getReceivedContracts(token).subscribe(res => {
       this.contracts=res;
      });
    }).catch(err => {
      console.log(err);
     return throwError;
    });
  }
 
  accept(un:string){
    this.auth.getToken().then(result => {
      this.auth.acceptContract(un, result)
      .subscribe(res => {
        this.presentToast('You have accepted the contract successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
        console.log(err);
      });
    });
    this.ngOnInit();
  }
  decline(un:string){
    this.auth.getToken().then(result => {
      this.auth.rejectContract(un, result)
      .subscribe(res => {
        this.presentToast('You have rejected the contract successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
        console.log(err);
      });
    });
    this.ngOnInit();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }
}
