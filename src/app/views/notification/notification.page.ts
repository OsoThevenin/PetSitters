import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPage implements OnInit  {
  
  received: any;
  proposed: any;

  constructor( private toastCtrl: ToastController, private auth: AuthProviderService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.received=this.getReceived();
    this.proposed=this.getProposed();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getReceived() {
    this.auth.getToken().then(result => {
      const token = result;
     this.auth.getReceivedContracts(token).subscribe(res => {
       this.received=res;
       console.log("received:",this.received);
      });
    }).catch(err => {
      console.log(err);
     return throwError;
    });
    return this.received;
  }
 
  getProposed(){
    this.auth.getToken().then(result => {
      const token = result;
     this.auth.getProposedContracts(token).subscribe(res => {
       this.proposed=res;
       console.log(res);
       console.log("proposed:",this.proposed);
      });
    }).catch(err => {
      console.log(err);
     return throwError;
    });
    return this.proposed;
  }

  accept(un:string){
    this.auth.getToken().then(result => {
      this.auth.acceptContract(un, result)
      .subscribe(res => {
        this.ngOnInit();
        this.presentToast('You have accepted the contract successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
        console.log(err);
      });
    });
  }

  decline(un:string){
    this.auth.getToken().then(result => {
      this.auth.rejectContract(un, result)
      .subscribe(res => {
        this.ngOnInit();
        this.presentToast('You have rejected the contract successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
        console.log(err);
      });
    });
  }

  cancel(un:string){
    this.presentAlert_D(un);
    /* Sin Alerta de confirmacion 
    this.auth.getToken().then(result => {
      this.auth.rejectContract(un, result)
      .subscribe(res => {
        this.ngOnInit();
        this.presentToast('You have cancelled the contract successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
        console.log(err);
      });
    });
    */
  }

  async presentAlert_D(un:string) {
    const alert = await this.alertController.create({
      header: 'Cancel contract',
      message: 'Are you sure you want to cancel the contract?',
      
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: cancelar => {
            this.auth.getToken().then(result => {
              this.auth.rejectContract(un, result)
              .subscribe(res => {
                this.ngOnInit();
                this.presentToast('You have cancelled the contract successfully!');
              }, err => {
                this.presentToast('Something went wrong, please try again');
                console.log(err);
              });
            });
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
