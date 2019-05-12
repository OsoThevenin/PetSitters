import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalSolicitudPage } from './modal-solicitud/modal-solicitud.page';
import { ModalController } from '@ionic/angular';

@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

constructor( private router: Router, private modalController: ModalController) { }

  ngOnInit() {
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
  
}