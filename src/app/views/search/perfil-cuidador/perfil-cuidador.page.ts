import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { SearchService } from 'src/app/providers/Search/search.service';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ChatsService } from './../../../providers/chats/chats.service';
import { Router } from '@angular/router';


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

  reportMotive: any = 'Spoiler Alert! Luffy vs Big Mom!';

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
    private search: SearchService, private auth: AuthProviderService, private chatsService: ChatsService,
	 private router: Router, private toastController: ToastController) {
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

  ReportUser() {
    this.auth.getToken().then(result => {
      this.search.reportUser(this.reportMotive, this.cuidador.username, result)
        .subscribe(res => {
           this.presentToast('User reported successfully!');
           this.router.navigateByUrl('/tabs/search');
        }, err => {
          console.log(err);
		  this.presentToast('There was an error reporting the user ' + err);
        });
    }, error => {
      console.log('Unable to get the token');
      // Maybe we should redirect the user to login page or show the rror to try it again
    });
  }


  startChat() {
	console.log(this.cuidador.username);
    this.auth.getToken().then(result => {
      let body: any = {
        otherUsername: this.cuidador.username
      };

      this.chatsService.startChat(body, result)
      .subscribe(res => {
        this.router.navigateByUrl('chat');
		//De momento solo va al mockup
      }, err => {
        console.log('Error al abrir chat');
      });
    });
  }

  goToSearch() {
    this.nav.navigateRoot('/tabs/search');
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
