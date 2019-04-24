import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { SearchService } from 'src/app/providers/Search/search.service';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-perfil-cuidador',
  templateUrl: './perfil-cuidador.page.html',
  styleUrls: ['./perfil-cuidador.page.scss'],
})
export class PerfilCuidadorPage implements OnInit {

  cuidador: any = {
    commentaries: null,
    description: null,
    localization: null,
    name: null,
    profile_image: null,
    stars: 0,
    username: null,
    expert: null,
  };

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

  constructor(private nav: NavController, private actrout: ActivatedRoute,
    private search: SearchService, private auth: AuthProviderService) {
  }

  ngOnInit() {
    const dataRev = this.actrout.snapshot.paramMap.get('username');
    this.auth.getToken().then(result => {
      const token = result;
      // console.log('token: ' + token);
      this.search.getUser(dataRev, token).subscribe(res => {
        console.log(res);
        this.cuidador = res;
        console.log(this.cuidador);
      });
    }).catch(err => {
      console.log(err);
      return throwError;
    });
    console.log(dataRev);
    console.log(this.cuidador);
  }

  goToSearch() {
    this.nav.navigateRoot('/tabs/search');
  }

  goToChat() {
    this.nav.navigateRoot('/tabs/search');
  }

}
