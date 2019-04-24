
import { PopoverController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { PopoverPage } from './popover/popover.page';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/providers/Search/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './../../shared/global.service';

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

  cuidador: any = {
    commentaries: null,
    description: null,
    localization: null,
    name: null,
    profile_image: null,
    stars: 0,
    username: null,
  };

  editable: boolean = false;
  reportMotive: any = 'Spoiler Alert! Luffy vs Big Mom!';

  @ViewChild('description') desc;

  constructor(private popoverCtrl: PopoverController, private auth: AuthProviderService, private actrout: ActivatedRoute,
    private search: SearchService,private modalCtrl:ModalController , private global: GlobalService) {}


  EditText() {
    this.editable = true;
  }

  NoEditText() {
    this.editable = false;
  }

  TakeText() {
    // Coger el valor nuevo y enviar a backend
    console.log(this.desc.value);

    const body: any = this.desc.value;
    const atr: string = "description";
    console.log(body);
    // Aqui hauriem de enviar el user al login si no te token
    this.auth.getToken().then(result => {
      const token = result;
      this.auth.modify(token,atr,body)
        .subscribe(res => {
          // When the result is okay
          //this.editable = false;
          },
          err => {
            const error: HttpErrorResponse = err;
            console.log(error);
        });
      });
      // Para que vuelva apparecer el lapis
      this.editable = false;
  }


  ngOnInit() {
    // obtener username mio
    const dataRev = this.global.username;
   // this.actrout.snapshot.paramMap.get('username');
    this.auth.getToken().then(result => {
      const token = result;
      // De momento usa el provider de search!!
      this.search.getUser(dataRev, token).subscribe(res => {
        this.cuidador = res;
      });
    }).catch(err => {
      console.log(err);
      return throwError;
    });
  }

  ReportUser() {
    this.auth.getToken().then(result => {
      this.search.reportUser(this.reportMotive, this.cuidador.username, result)
        .subscribe(res => {
          console.log('User reported successfully');
          // Present toast with success message
        }, err => {
          console.log(err);
          // Present toast with error message
        });
    }, error => {
      console.log('Unable to get the token');
      // Maybe we should redirect the user to login page or show the rror to try it again
    });
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
