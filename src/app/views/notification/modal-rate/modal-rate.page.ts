import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { ContractsService } from 'src/app/providers/contracts/contracts.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-modal-rate',
  templateUrl: './modal-rate.page.html',
  styleUrls: ['./modal-rate.page.scss'],
})
export class ModalRatePage implements OnInit {
  public words: Array<string> = ["Please tell us about your experience with this user","Comment","Cancel","Rate",'You have rated this user successfully!','Something went wrong, please try again','Add a comment (optional)','Rate User']
  @ViewChild('stars') stars;
  @ViewChild('comment') comment;

  public ratedUser: any;

  constructor( private toastCtrl: ToastController, private modalController: ModalController, private contracts: ContractsService, private auth: AuthProviderService,private navParams: NavParams) { }

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
    this.contracts.saveValuation(body,token).subscribe(res =>{
      this.contracts.rejectContract(this.ratedUser, result)
      .subscribe(res => {
        this.presentToast(this.words[4]);
      }, err => {
        this.presentToast(this.words[5]);
      console.log(err);
      });
    });
    }).catch(err => {
      console.log(err);
     return throwError;
    });

    this.modalController.dismiss();
  }

  actual_language: string;
  ngOnInit() {
  this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
      console.log(lang);
    }); 
	this.translate();
    this.ratedUser = this.navParams.get('usernameRated');
  }

translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,this.actual_language,token).subscribe(res => {
			this.words = res;
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.words;
}


  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }

}
