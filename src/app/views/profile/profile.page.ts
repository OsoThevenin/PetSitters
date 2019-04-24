import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { Router } from '@angular/router';
import { ChatsService } from './../../providers/chats/chats.service';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(private popoverCtrl: PopoverController, private chatsService: ChatsService,
    private router: Router, private auth: AuthProviderService) {
  }

  startChat() {
    this.auth.getToken().then(result => {
      let body: any = {
        otherUsername: this.cuidador.username
      };

      this.chatsService.startChat(body, result)
      .subscribe(res => {
        this.router.navigateByUrl('chat');
      }, err => {
        console.log('Error al abrir chat');
      });
    });
  }
  async OpenPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: {
        ev: ev,
      },
    });
    return await popover.present();
  }

}
