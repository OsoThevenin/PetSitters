import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private storage: Storage, private nav: NavController) {
    this.storage.get('token').then((val) => {
      if (val === null) {
        this.nav.navigateRoot(`/login`);
      }
    });
  }
}
