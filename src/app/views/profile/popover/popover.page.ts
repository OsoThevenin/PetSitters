import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  public SettingsMenu = [
    {title: "Log out", icon: "log-out"},
    {title: "Delete Profile", icon: "trash"}
  ];

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss();
  }

}
