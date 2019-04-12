import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-cuidador',
  templateUrl: './perfil-cuidador.page.html',
  styleUrls: ['./perfil-cuidador.page.scss'],
})
export class PerfilCuidadorPage implements OnInit {

  constructor(private nav: NavController) {
  }

  ngOnInit() {
  }

  goToSearch() {
    this.nav.navigateRoot('/tabs/search');
  }
}
