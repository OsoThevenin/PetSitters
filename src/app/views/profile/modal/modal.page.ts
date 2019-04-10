import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  changePasswordForm: FormGroup;

  error_messages ={
    'password':[
      {type:'required', message: 'Password is required.'},
      {type:'minlength', message: 'Password length must be longer or equal than 6 characters.'},
      {type:'maxlength', message: 'Password must be shorter than 25 characters.'},
      {type:'pattern', message: 'Password must contain numbers, uppercase and lowercase characters.'}
    ],
  };

  @ViewChild('current') current;
  @ViewChild('new') new;
  @ViewChild('confirmed') confirmed;
  

  constructor(private modalController: ModalController,public formBuilder: FormBuilder) { 

    this.changePasswordForm = this.formBuilder.group({
      pw1fc: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      pw2fc: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });

  }

  
  ngOnInit() {
  }

  Confirm(){
    const body: any = {
      newPassword: this.new.value,
      oldPassword: this.current.value
    };
  }

  Cancel() {
    this.modalController.dismiss();
  }

}
