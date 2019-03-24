import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popoverController: PopoverController, private nav: NavController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  LogOut() {
    // Falta combinar amb la part del Pere
    console.log("You click on Log out");
    this.nav.navigateForward(`/login`);
    this.closePopover();
  }

  DeleteProfile() {
    console.log("You click on Delete Profile");
  }

}
