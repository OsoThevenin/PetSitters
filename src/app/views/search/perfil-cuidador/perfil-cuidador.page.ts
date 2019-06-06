import { AuthProviderService } from './../../../providers/auth/auth-provider.service';
import { SearchService } from './../../../providers/Search/search.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ChatsService } from './../../../providers/chats/chats.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/providers/profile/profile.service';


@Component({
  selector: 'app-perfil-cuidador',
  templateUrl: './perfil-cuidador.page.html',
  styleUrls: ['./perfil-cuidador.page.scss'],
})
export class PerfilCuidadorPage implements OnInit {
  public words: Array<string> = ["Description", "This user did not enter a description", "Availability", "From:", "To:",
  "Expert on", "Dogs", "Cats", "Ferrets", "Reptiles", "Birds", "Rodents", "Fishes", "Amphibians", "Arthropods", "Other",
  "This user did not enter any expertise", "Previous Valuations",'Report User', 'Please tell us why you are sending us this report',
  'Add an explanation (optional)', 'Cancel', 'Confirm', 'User reported successfully!', 'There was an error reporting the user ',
  'Something went wrong, please try it again']
  public expertiseTranslated = [
    { type: 'Dogs', isChecked: false },
    { type: 'Cats', isChecked: false },
    { type: 'Ferrets', isChecked: false },
    { type: 'Reptiles', isChecked: false },
    { type: 'Birds', isChecked: false },
    { type: 'Rodents', isChecked: false },
    { type: 'Fishes', isChecked: false },
    { type: 'Amphibians', isChecked: false },
    { type: 'Arthropods', isChecked: false },
    { type: 'Other', isChecked: false }
  ];

  public expertise = [
    { type: 'Dogs', isChecked: false },
    { type: 'Cats', isChecked: false },
    { type: 'Ferrets', isChecked: false },
    { type: 'Reptiles', isChecked: false },
    { type: 'Birds', isChecked: false },
    { type: 'Rodents', isChecked: false },
    { type: 'Fishes', isChecked: false },
    { type: 'Amphibians', isChecked: false },
    { type: 'Arthropods', isChecked: false },
    { type: 'Other', isChecked: false }
  ];
  hazlista=false;

     
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

 previousVal: any = [
  {
  comment: "",
  nameOfUserWhoValues: "",
  profileImage: "",
  stars: 0,
  usernameWhoValues: "",
  whenValued: "",
  }
];

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
   private router: Router, private toastController: ToastController, private alertController: AlertController, private profile: ProfileService) {
  }

  traducirAExpertise(){
    let hay=false;
	for(let i = 0; i<10; i++){
		this.expertiseTranslated[i].isChecked=false;
		this.cuidador.expert.forEach(animal => {
        if(this.expertise[i].type==animal){
          hay=true;
          this.expertiseTranslated[i].isChecked=true;
        }
      });
	}
    this.hazlista=hay;

  }

  actual_language: string;
  ngOnInit() {
    this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
    }); 
	this.translate();
    this.previousVal = this.getPreviousVal();
    this.auth.getToken().then(result => {
      const token = result;
      // console.log('token: ' + token);
      console.log(this.dataRev)
      this.search.getUser(this.dataRev, token).subscribe(res => {
        //console.log(res);
        this.cuidador = res;
        this.traducirAExpertise();
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
           this.presentToast(this.words[23]);
           this.router.navigateByUrl('/tabs/search');
        }, err => {
          console.log(err);
		      this.presentToast(this.words[24] + err);
        });
    }, error => {
      console.log('Unable to get the token');
      // Maybe we should redirect the user to login page or show the error to try it again
    });
  }


  startChat() {
    this.router.navigateByUrl('chat/' + this.cuidador.username);
  }
  
  desmarcarFavorito() {
    console.log("He clicado desmarcar como favorito");
    this.auth.getToken().then(result => {
      const dataRev = this.actrout.snapshot.paramMap.get('username');
      this.auth.unsetFavorites(dataRev, result).subscribe(res => {
        this.favorito = false;
      }, err => {
        this.presentToast(this.words[25]);
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
            this.presentToast(this.words[25]);
          });
    }).catch(err => {
      console.log(err);
      return throwError;
    });
  }

  goBack() {
    // para volver atras y no solo ir al search
    //this.nav.navigateRoot('/tabs/search');
    this.nav.back();
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
      header: this.words[18],
      message: this.words[19],
      inputs: [
        {
          name: 'reportMotive',
          placeholder: this.words[20], 
          type: 'text'
        }
      ],
      buttons: [
        {
        text: this.words[21],
        role: 'cancel'
        },
        {
          text: this.words[22],
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

  getPreviousVal(): any {
    this.auth.getToken().then(result => {
      const token = result;
      this.profile.getPreviousValuations(token).subscribe(res => {
	      console.log(res);
	      this.previousVal = res;
	      console.log(this.previousVal);
	    });
    }).catch(err => {
	    console.log(err);
	    return throwError;
    });
    return this.previousVal;
  }

async translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,this.actual_language,token).subscribe(res => {
			this.words =  res;
			this.expertiseTranslated = [
    { type:  this.words[6], isChecked: false },
    { type:  this.words[7], isChecked: false },
    { type:  this.words[8], isChecked: false },
    { type:  this.words[9], isChecked: false },
    { type:  this.words[10], isChecked: false },
    { type:  this.words[11], isChecked: false },
    { type:  this.words[12], isChecked: false },
    { type:  this.words[13], isChecked: false },
    { type:  this.words[14], isChecked: false },
    { type:  this.words[15], isChecked: false }
  ];
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  return await this.words;
}

}
