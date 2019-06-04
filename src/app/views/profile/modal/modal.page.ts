import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  public words: Array<string> = ["Change Password", "To change your password, please enter old and new password:", "Current Password", "New Password", "Confirmed Password", "Confirm", "Cancel"]
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
  

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private toastCtrl: ToastController,
    private auth: AuthProviderService, private popoverController: PopoverController) { 

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

translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,"es",token).subscribe(res => {
			this.words = res;
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.words;
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
    //Comunicació amb el backend i tractament de possibles errors/missatge de succés.
    this.auth.getToken().then(result => {
      //Creo un json amb els paràmetres necessaris per canviar la contrasenya
      const data: any = {
        newPassword: Md5.hashAsciiStr('petsitterplot420 ' + this.new.value),
        oldPassword: Md5.hashAsciiStr('petsitterplot420 ' + this.current.value)
      };
      //console.log(data);
      this.auth.changePassword(data, result)
      .subscribe(res => {
        this.presentToast('Your password has been successfully changed');
        this.modalController.dismiss();
        this.popoverController.dismiss();
      }, err => {
        this.presentToast('Something went wrong, please try it again');
        console.log(err);
      });
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

  Cancel() {
    this.modalController.dismiss();
  }

}
