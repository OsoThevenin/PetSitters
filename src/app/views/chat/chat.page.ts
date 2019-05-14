import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalSolicitudPage } from './modal-solicitud/modal-solicitud.page';
import { ModalController } from '@ionic/angular';
import {ChatsService } from 'src/app/providers/chats/chats.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';

@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public contratado: boolean = false;
constructor( private router: Router, private modalController: ModalController, private chats: ChatsService, private auth: AuthProviderService) { }

  ngOnInit() {
	this.auth.getToken().then(result => {
    const token = result;

	this.chats.isContracted("daniel",token).subscribe(res =>{
	  if(res!=null) contratado=true;
	});

	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  }

  goBack(){
    this.router.navigateByUrl('/tabs/chats');
  }
  abrirCamara(){
    console.log("Juntar con lo de Pere")
  }
  goProfile(){
    console.log("voyprofile")
  }
  contratar(){
    //console.log("contrato")
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalSolicitudPage,
      cssClass: 'my-changePW-modal-css'
    });
    return await modal.present();
  }
  
  cancelar(){
    this.presentAlert_D();
  }


  async presentAlert_D() {
    const alert = await this.alertController.create({
      header: 'Cancel contract',
      message: 'Are you sure you want to can the contract?',
      
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          // funcionalitat de cancelar contracte
        }
      ]
    });

    await alert.present();
  }
}