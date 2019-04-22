import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from 'src/app/providers/Search/search.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  constructor(private nav: NavController, private search: SearchService, private auth: AuthProviderService) {
  }

   /* {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
];*/

perfilsCuidadors = this.devuelvePerfilesCuidadores();

goToPerfilCuidador(cuidadorConcret) {
  /*console.log(cuidadorConcret.username);
  this.auth.getToken().then(result => {
    const token = result;
    console.log('token: ' + token);
    this.search.getUser(cuidadorConcret.username, token).subscribe(res => {
      console.log(res);
    });
  }).catch(err => {
    console.log(err);
    return throwError;
  });*/
  this.nav.navigateRoot(`/perfil-cuidador/` + cuidadorConcret.username);
}

devuelvePerfilesCuidadores(): any {
  this.auth.getToken().then(result => {
    const token = result;
    console.log('token: ' + token);
    this.search.getUsersList(token).subscribe(res => {
      // console.log(res);
      this.perfilsCuidadors = res;
      // console.log(this.perfilsCuidadors);
    });
  }).catch(err => {
    console.log(err);
    return throwError;
  });
  return this.perfilsCuidadors;
  }
}
