import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/providers/Search/search.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

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

  @ViewChild('description') desc;

  constructor(private popoverCtrl: PopoverController, private auth: AuthProviderService, private actrout: ActivatedRoute,
    private search: SearchService) {}


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
    const dataRev = "AlexV98"
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


  async OpenPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: {
        ev: ev,
      },
    });
    return await popover.present();
  }

}
