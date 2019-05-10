import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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

     
 monday: any ={from: '', to: ''}
 tuesday: any ={from: '', to: ''}
 wednesday: any ={from: '', to: ''}
 thursday: any ={from: '', to: ''}
 friday: any ={from: '', to: ''}
 saturday: any ={from: '', to: ''}
 sunday: any ={from: '', to: ''}

 diaActual: any = this.monday;
 readonlyBool: boolean = true;
 day: string = "Mon";

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

  favorito: boolean = false;
  favorites: any;
  dataRev = this.actrout.snapshot.paramMap.get('username');

  constructor(private nav: NavController, private actrout: ActivatedRoute,
    private search: SearchService, private auth: AuthProviderService, private chatsService: ChatsService,
   private router: Router, private toastController: ToastController, private alertController: AlertController) {
  }

  ngOnInit() {
    this.auth.getToken().then(result => {
      const token = result;
      // console.log('token: ' + token);
      this.search.getUser(this.dataRev, token).subscribe(res => {
        //console.log(res);
        this.cuidador = res;
        if (this.cuidador.availability != "None") {
          let horasdias: string[]=this.cuidador.availability.split(','); 
           this.monday.from=horasdias[0];
           this.monday.to=horasdias[1];
           this.tuesday.from=horasdias[2];
           this.tuesday.to=horasdias[3];
           this.wednesday.from=horasdias[4];
           this.wednesday.to=horasdias[5];
           this.thursday.from=horasdias[6];
           this.thursday.to=horasdias[7];
           this.friday.from=horasdias[8];
           this.friday.to=horasdias[9];
           this.saturday.from=horasdias[10];
           this.saturday.to=horasdias[11];
           this.sunday.from=horasdias[12];
           this.sunday.to=horasdias[13];
        }
      });

      this.auth.getFavorites(token).subscribe(res => {
        //console.log("res:", res)
        this.favorites = res;
        if (typeof this.favorites !== null) {
          for (var i of this.favorites) {
            if (i.username == this.dataRev) {
              this.favorito = true;
            }
          }
        }

      });

    }).catch(err => {
      console.log(err);
      return throwError;
    });
  }

  ReportUser() {
    this.auth.getToken().then(result => {

      console.log(this.reportMotive);

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
      // Maybe we should redirect the user to login page or show the error to try it again
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
        this.router.navigateByUrl('tabs/chats/chat');
		//De momento solo va al mockup
      }, err => {
        console.log('Error al abrir chat');
      });
    });
  }
  
  desmarcarFavorito() {
    console.log("He clicado desmarcar como favorito");
    this.auth.getToken().then(result => {
      const dataRev = this.actrout.snapshot.paramMap.get('username');
      this.auth.unsetFavorites(dataRev, result).subscribe(res => {
        this.favorito = false;
      }, err => {
        this.presentToast('Something went wrong, please try it again');
        console.log(err);
      });
    });
  }

  marcarFavorito(){
    console.log("He clicado marcar como favorito");
    this.auth.getToken().then(result => {
      const token = result;
      const data = this.actrout.snapshot.paramMap.get('username');
      //console.log('token: ' + token);
      this.auth.addFavorites(data, token).
          subscribe(res => {
            this.favorito = true;
          }, err => {
            console.log(err);
            this.presentToast('Something went wrong, please try it again');
          });
    }).catch(err => {
      console.log(err);
      return throwError;
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

  async presentAlert_Report() {
    const alert = await this.alertController.create({
      header: 'Report User',
      message: 'Please tell us why you are sending us this report',
      inputs: [
        {
          name: 'reportMotive',
          placeholder: 'Add an explanation (optional)', 
          type: 'text'
        }
      ],
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Confirm',
          // funcionalitat de reportar usuario
          handler: report => {
            if (report.reportMotive !== '') {
              this.reportMotive = report.reportMotive;
            }
            this.ReportUser();
          }
        }
      ]
    });

    await alert.present();
  }

  segmentChanged(event){
    if(this.day=="Mon"){
      this.diaActual=this.monday;
    }
    else if(this.day=="Tue"){
      this.diaActual=this.tuesday;
    }
    else if(this.day=="Wed"){
      this.diaActual=this.wednesday;
    }
    else if(this.day=="Thu"){
      this.diaActual=this.thursday;
    }
    else if(this.day=="Fri"){
      this.diaActual=this.friday;
    }
    else if(this.day=="Sat"){
      this.diaActual=this.saturday;
    }
    else if(this.day=="Sun"){
      this.diaActual=this.sunday;
    }
  }

}
