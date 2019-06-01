import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ChatsService } from 'src/app/providers/chats/chats.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-modal-rate',
  templateUrl: './modal-rate.page.html',
  styleUrls: ['./modal-rate.page.scss'],
})
export class ModalRatePage implements OnInit {

  @ViewChild('stars') stars;
  @ViewChild('comment') comment;

  public ratedUser: any;

  constructor( private toastCtrl: ToastController, private modalController: ModalController, private chats: ChatsService, private auth: AuthProviderService,private navParams: NavParams) { }

  cancel(){
    this.modalController.dismiss();
  }

  rate(){
    this.auth.getToken().then(result => {
      const token = result;
    let body: any = {
      commentary: this.comment.value,
      stars: this.stars.value,
      valuedUser: this.ratedUser,
    };
    console.log(body);
    this.chats.saveValuation(body,token).subscribe(res =>{
      this.auth.rejectContract(this.ratedUser, result)
      .subscribe(res => {
        this.presentToast('You have rated this user successfully!');
      }, err => {
        this.presentToast('Something went wrong, please try again');
      console.log(err);
      });
    });
    }).catch(err => {
      console.log(err);
     return throwError;
    });

    this.modalController.dismiss();
  }

  ngOnInit() {
    this.ratedUser = this.navParams.get('usernameRated');
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }

}
