import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-cuidador',
  templateUrl: './perfil-cuidador.page.html',
  styleUrls: ['./perfil-cuidador.page.scss'],
})
export class PerfilCuidadorPage implements OnInit {

  commentsProfile: any = [
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
  ];

  constructor(private nav: NavController) {
  }

  ngOnInit() {
  }

  goToSearch() {
    this.nav.navigateRoot('/tabs/search');
  }

  goToChat() {
    this.nav.navigateRoot('/tabs/search');
  }
}
