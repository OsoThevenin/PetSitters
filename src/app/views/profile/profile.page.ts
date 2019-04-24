import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import * as moment from 'moment';
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }


  commentsProfile: any =[
    {
      avatar: '../../../assets/default_avatar.png',
      name: 'David Garcia',
      rating: 5,
      date: '23/03/2016',
      text: 'Very good experience with this petsitter.'

    },
    {
      avatar: '../../../assets/default_avatar.png',
      name: 'Pere Bruy',
      rating: 1,
      date: '23/03/2019',
      text: 'Very bad experience with this petsitter.'

    }
  ]

  constructor(private popoverCtrl: PopoverController, private modalCtrl:ModalController) {
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

  addEvent(){
  
  }

  onEventSelected(event){
    let start =moment(event.startTime).format('LLLL');
    let end =moment(event.startTime).format('LLLL');

    let alert = this
  }

  onTimeSelected(event){
    this.selectedDay=event.selectedDay;
  }
  onViewTitleChanged(title){
    this.viewTitle=title;
  }
}
