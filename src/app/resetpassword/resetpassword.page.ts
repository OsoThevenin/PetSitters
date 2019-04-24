import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor( private toastCtrl: ToastController, public formBuilder: FormBuilder,) { 
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
    //Falta comunicació amb el request de backend i tractament de possibles errors
    this.presentToast('Something went wrong, please try it again');

    //Si tot ha anat bé, redirigir a la pàgina o modal per introduir el password nou
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
