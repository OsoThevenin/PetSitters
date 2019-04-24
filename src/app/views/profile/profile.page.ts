
import { PopoverController, ModalController } from '@ionic/angular';
//import * as moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { Router } from '@angular/router';
import { ChatsService } from './../../providers/chats/chats.service';
import { PopoverPage } from './popover/popover.page';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/providers/Search/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './../../shared/global.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
 // eventSource = [];
 // viewTitle: string;
 // selectedDay = new Date();
  
 // calendar = {
 //   mode: 'month',
  //  currentDate: this.selectedDay
 // }
  monday: any ={from: '8:00', to: '17:00'}
  tuesday: any ={from:'06:00', to: '09:00'}
  wednesday: any ={from:'00:00', to: '23:59'}
  thursday: any ={from:'06:00', to: '09:00'}
  friday: any ={from:'06:00', to: '09:00'}
  saturday: any ={from:'06:00', to: '09:00'}
  sunday: any ={from:'06:00', to: '09:00'}
 
  botonEditar:boolean = true;
  readonlyBool: boolean = true;
  dia: string;
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
    availability: null,
    commentaries: null,
    description: null,
    localization: null,
    name: null,
    profile_image: null,
    stars: 0,
    username: null,
    expert: null,
  };

  editable: boolean = false;
  availabilityEditable: boolean = false;
  expertEditable: boolean = false;
  reportMotive: any = 'Spoiler Alert! Luffy vs Big Mom!';
  diaSegment: string;

  @ViewChild('description') desc;
  @ViewChild('availability') av;
  @ViewChild('expert') exp;
  @ViewChild('from') f;
  @ViewChild('to') t;

  constructor(private popoverCtrl: PopoverController, private auth: AuthProviderService, private actrout: ActivatedRoute,
    private search: SearchService,private modalCtrl:ModalController , private global: GlobalService,private chatsService: ChatsService,
    private router: Router,
     private storage: Storage) {}


  EditText() {
    this.editable = true;
  }

  NoEditText() {
    this.editable = false;
  }

  EditAvailability() {
    this.availabilityEditable = true;
  }

  NoEditAvailability() {
    this.availabilityEditable = false;
  }

  EditExpert(){
    this.expertEditable = true;
  }

  NoEditExpert(){
    this.expertEditable = false;
  }
  TakeTextDescription() {
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

  TakeAvailability() {
    // Coger el valor nuevo y enviar a backend
    console.log(this.av.value);

    const body: any = this.av.value;
    const atr: string = "availability";
    console.log(body);
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
      this.availabilityEditable = false;
    }
  TakeTextExpert() {
    // Coger el valor nuevo y enviar a backend
    console.log(this.exp.value);

    const body: any = this.exp.value;
    const atr: string = "expert";
    console.log(body);
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
      this.expertEditable = false;
  }


  ngOnInit() {
    // obtener username mio
    this.auth.getUsername().then(uname => {
    const username = uname;
    console.log(username);
    

   // this.actrout.snapshot.paramMap.get('username');
    this.auth.getToken().then(result => {
      const token = result;
      // De momento usa el provider de search!!
      this.search.getUser(username, token).subscribe(res => {
        this.cuidador = res;
      });
    }).catch(err => {
      console.log(err);
      return throwError;
    });
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

  startChat() {
    this.auth.getToken().then(result => {
      let body: any = {
        otherUsername: this.cuidador.username
      };

      this.chatsService.startChat(body, result)
      .subscribe(res => {
        this.router.navigateByUrl('chat');
      }, err => {
        console.log('Error al abrir chat');
      });
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

  editButton(){
    this.readonlyBool=false;
    this.botonEditar=false;
  }
  guardarButton(){
    if(this.dia="monday") {
      this.monday.from=this.f.value;
      this.monday.to=this.t.value;
    }
    this.readonlyBool=true;
    this.botonEditar=true;
    this.diaSegment="Mon";
  }

  segmentButtonClicked(event){
    this.dia="monday";
  }
  //addEvent(){
  
  //}

  //onEventSelected(event){
  //  let start =moment(event.startTime).format('LLLL');
  //  let end =moment(event.startTime).format('LLLL');

  //  let alert = this
 // }

  //onTimeSelected(event){
  //  this.selectedDay=event.selectedDay;
  //}
  //onViewTitleChanged(title){
  //  this.viewTitle=title;
  //}
}
