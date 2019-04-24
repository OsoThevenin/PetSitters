import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.page.html',
  styleUrls: ['./newpassword.page.scss'],
})
export class NewpasswordPage implements OnInit {

  resetPasswordForm: FormGroup;

  @ViewChild('new') new;
  @ViewChild('confirmed') confirmed;

  error_messages ={
    'password':[
      {type:'required', message: 'New password is required.'},
      {type:'minlength', message: 'Password length must be longer or equal than 6 characters.'},
      {type:'maxlength', message: 'Password must be shorter than 25 characters.'},
      {type:'pattern', message: 'Password must contain numbers, uppercase and lowercase characters.'}
    ],
    'confirm' :[
      {type:'required', message: 'Confirm password is required.'},
      {type:'equalTo', message: 'Password mismatch.'}
    ]
  };

  constructor(public formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController) {
    this.resetPasswordForm = this.formBuilder.group({
      pw1fc: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      pw2fc: new FormControl('', [Validators.required, this.equalto('pw1fc')])
    });
  }
    
    equalto(field_name): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
      
      let input = control.value;
      
      let isValid=control.root.value[field_name]==input
      if(!isValid) 
      return { 'equalTo': {isValid} }
      else 
      return null;
      };
  }

  Confirm(){
    //Creo un json amb els paràmetres necessaris per canviar la contrasenya
    const body: any = {
      newPassword: this.new.value,
    };
    //Falta comunicació amb el backend i tractament de possibles errors/missatge de succés.
    this.presentToast('Something went wrong, please try it again');
    this.presentToast('Your password has been successfully reset');
    //Redirigir a la pàgina del login
    this.router.navigateByUrl('/login');
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
