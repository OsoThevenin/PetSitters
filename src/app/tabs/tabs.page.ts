import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthProviderService } from '../providers/auth/auth-provider.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  numnotifications = 0;

  constructor(private storage: Storage, private nav: NavController, private auth: AuthProviderService) {
    this.storage.get('token').then((val) => {
      if (val === null) {
        this.nav.navigateRoot(`/login`);
      }
    });
    this.auth.getToken().then(result => {
      const token = result;
      if(result != null){
      this.auth.getNotifications(token).subscribe(res => {
       console.log(res);
       let count = 0;
       res.forEach(element => {
       if( element == true) count++;
       });
       this.numnotifications = count;
      });
    }
    }).catch(err => {
      console.log(err);
    });
  }
}
