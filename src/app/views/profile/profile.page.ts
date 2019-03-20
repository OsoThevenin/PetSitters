import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  public SettingsMenu = [
    {title: "Log out", icon: "log-out"},
    {title: "Delete Profile", icon: "trash"}
  ];

  constructor(private menuCtrl: MenuController) {}
  
  OpenMenu() {
    this.menuCtrl.toggle();
  }

}