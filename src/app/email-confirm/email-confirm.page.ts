import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthProviderService } from '../providers/auth/auth-provider.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.page.html',
  styleUrls: ['./email-confirm.page.scss'],
})
export class EmailConfirmPage implements OnInit {

  constructor(private router: Router, private auth: AuthProviderService,  private toastCtrl: ToastController, private actrout: ActivatedRoute) { }

  continue() {
    this.router.navigateByUrl('/login');
  }
  resend() {
    const dataRev = this.actrout.snapshot.paramMap.get('username');
    this.auth.resendEmail(dataRev)
      .subscribe(res => {
        // When the result is okay
        console.log(res);
        this.presentToast('Please check your inbox: An email is on the way');
        },
        err => {
          console.log(err);
          this.presentToast('Something went wrong, please try it again!');
      });
  }

    //Funció per mostra missatges
    async presentToast(message) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2500
      });
      await toast.present();
    }
  
  

  ngOnInit() {
  }

}
