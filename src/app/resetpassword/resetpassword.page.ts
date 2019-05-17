import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProviderService } from '../providers/auth/auth-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  @ViewChild('email') em;

  error_messages ={
    'email':[
      {type:'required', message: 'Email is required.'},
      {type:'pattern', message: 'Email must be valid.'}
    ]
  };

  EmailForm: FormGroup;

  constructor( private toastCtrl: ToastController, public formBuilder: FormBuilder, private auth: AuthProviderService, private router: Router) { 
    this.EmailForm = this.formBuilder.group({
      emfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((?!(^[.-].*|[^@]*[.-]@|.*\\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~.-]+@)(?!-.*|.*-\\.)([a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,15})$")
      ]))
    });
  }

  ngOnInit() {
  }

  

  send() {
    //Creo json para requestResetPassword
    const body: any = {
      email: this.em.value
    };
    this.auth.requestResetPassword(body)
        .subscribe(res => {
          // si todo ha ido bien
          this.router.navigateByUrl('/login');
          this.presentToast('Please check your inbox: An email is on the way');
        }, err => {
          this.presentToast('Something went wrong, please try it again');
          console.log(err);
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

}
