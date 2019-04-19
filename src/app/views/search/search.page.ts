import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from 'src/app/providers/Search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  constructor(private nav: NavController, private search: SearchService) {
  }

  data = [
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
];

perfilsCuidadors = this.devuelvePerfilesCuidadores();

goToPerfilCuidador(cuidadorConcret) {
  console.log('hola');
  this.nav.navigateRoot(`/perfil-cuidador`, cuidadorConcret);
}

devuelvePerfilesCuidadores(): any {
  this.search.getUsers().subscribe(data => {console.log(data)});
  return this.data;
  }
}
