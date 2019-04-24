import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  changePasswordForm: FormGroup;

  error_messages ={
    'current' :[ {type:'required', message: 'Current password is required.'} ],
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

  @ViewChild('current') current;
  @ViewChild('new') new;
  @ViewChild('confirmed') confirmed;
  

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private toastCtrl: ToastController,) { 

    this.changePasswordForm = this.formBuilder.group({
      pw0fc: new FormControl('', Validators.compose([
        Validators.required
      ])),
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
  
  ngOnInit() {
  }

  Confirm(){
    //Creo un json amb els paràmetres necessaris per canviar la contrasenya
    const body: any = {
      newPassword: this.new.value,
      oldPassword: this.current.value
    };
    //Falta comunicació amb el backend i tractament de possibles errors/missatge de succés.
    this.presentToast('Something went wrong, please try it again');
    this.presentToast('Your password has been successfully changed');
  }

  //Funció per mostra missatges
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }

  Cancel() {
    this.modalController.dismiss();
  }

}
