import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ContractsService} from 'src/app/providers/contracts/contracts.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastController, AlertController, ModalController } from '@ionic/angular';

import { ModalRatePage } from './modal-rate/modal-rate.page';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPage implements OnInit  {
  
  received: any;
  proposed: any;
  notifications: any;

  constructor( private toastCtrl: ToastController, private auth: AuthProviderService, private alertController: AlertController,
    private modalController: ModalController, private contracts: ContractsService) {
  
  }

  ngOnInit() {
    this.received=this.getReceived();
    this.proposed=this.getProposed();
    this.getNotifications();
  }

  getNotifications() {
    this.auth.getToken().then(result => {
      const token = result;
      this.auth.getNotifications(token).subscribe(res => {
        this.notifications = res;
        console.log("notifications", res);
       });
      this.auth.nullifyNotifications(token).subscribe(res => {
        console.log("notifications", res);
       });
    }).catch(err => {
      console.log(err);
     return throwError;
    });
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

  tiempoAcabado(t:string){
    let currentDate = new Date();
    let endDate = new Date(parseInt(t.substring(6,10)),parseInt(t.substring(3,5))-1,parseInt(t.substring(0,2)),parseInt(t.substring(12,14)),parseInt(t.substring(15,17)));
    return currentDate>=endDate;
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

  rate(un:string){
    this.openModal(un);
  }

  async openModal(un:string) {
    const modal = await this.modalController.create({
      component: ModalRatePage,
      componentProps: {
          usernameRated: un
      },
      cssClass: 'my-rate-modal-css'
    });
    return await modal.present();
  }


  decline(un:string){
    this.auth.getToken().then(result => {
      this.contracts.rejectContract(un, result)
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
      this.contracts.rejectContract(un, result)
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
              this.contracts.rejectContract(un, result)
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
