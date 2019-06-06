import { GlobalService } from './../../../shared/global.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PopoverController, NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  public words: Array<string> = ["Log out", "Language", "Notifications", "Change Password", "Delete Profile", "Close Settings", 'Delete Profile',
  'Are you sure you want to delete your profile? Put your password to confirm this action.', 'Password', 'Cancel',
  'Confirm', 'Something went wrong, please try it again', 'Password field cannot be empty']
  notific: boolean;

  public mylanguage: any;
  actual_language: string;

  constructor(private popoverController: PopoverController, private nav: NavController,
     private alertController: AlertController, private auth: AuthProviderService,
     private toastCtrl: ToastController, private global: GlobalService,
     private modalController: ModalController, private storage: Storage) { }

     languages: any[] = [
      {
        name: 'Afrikaans',
        acronym: 'af',
      },
      {
        name: 'Albanian',
        acronym: 'sq',
      },
      {
        name: 'Amharic',
        acronym: 'am',
      },
      {
        name: 'Arabic',
        acronym: 'ar',
      },
      {
        name: 'Armenian',
        acronym: 'hy',
      },
      {
        name: 'Azerbaijani',
        acronym: 'az',
      },
      {
        name: 'Basque',
        acronym: 'eu',
      },
      {
        name: 'Belarusian',
        acronym: 'be',
      },
      {
        name: 'Bengali',
        acronym: 'bn',
      },
      {
        name: 'Bosnian',
        acronym: 'bs',
      },
      {
        name: 'Bulgarian',
        acronym: 'bg',
      },
      {
        name: 'Catalan',
        acronym: 'ca',
      },
      {
        name: 'Cebuano',
        acronym: 'ceb',
      },
      {
        name: 'Chinese (Simplified)',
        acronym: 'zh-CN',
      },
      {
        name: 'Chinese (Traditional)',
        acronym: 'zh-TW',
      },
      {
        name: 'Corsican',
        acronym: 'co',
      },
      {
        name: 'Croatian',
        acronym: 'hr',
      },
      {
        name: 'Czech',
        acronym: 'cs',
      },
      {
        name: 'Danish',
        acronym: 'da',
      },
      {
        name: 'Dutch',
        acronym: 'nl',
      },
      {
        name: 'English',
        acronym: 'en',
      },
      {
        name: 'Esperanto',
        acronym: 'eo',
      },
      {
        name: 'Estonian',
        acronym: 'et',
      },
      {
        name: 'Finnish',
        acronym: 'fi',
      },
      {
        name: 'French',
        acronym: 'fr',
      },
      {
        name: 'Frisian',
        acronym: 'fy',
      },
      {
        name: 'Galician',
        acronym: 'gl',
      },
      {
        name: 'Georgian',
        acronym: 'ka',
      },
      {
        name: 'German',
        acronym: 'de',
      },
      {
        name: 'Greek',
        acronym: 'el',
      },
      {
        name: 'Gujarati',
        acronym: 'gu',
      },
      {
        name: 'Haitian Creole',
        acronym: 'ht',
      },
      {
        name: 'Hausa',
        acronym: 'ha',
      },
      {
        name: 'Hawaiian',
        acronym: 'haw',
      },
      {
        name: 'Hebrew',
        acronym: 'he**',
      },
      {
        name: 'Hindi',
        acronym: 'hi',
      },
      {
        name: 'Hmong',
        acronym: 'hmn',
      },
      {
        name: 'Hungarian',
        acronym: 'hu',
      },
      {
        name: 'Icelandic',
        acronym: 'is',
      },
      {
        name: 'Igbo',
        acronym: 'ig',
      },
      {
        name: 'Indonesian',
        acronym: 'id',
      },
      {
        name: 'Irish',
        acronym: 'ga',
      },
      {
        name: 'Italian',
        acronym: 'it',
      },
      {
        name: 'Japanese',
        acronym: 'ja',
      },
      {
        name: 'Javanese',
        acronym: 'jw',
      },
      {
        name: 'Kannada',
        acronym: 'kn',
      },
      {
        name: 'Kazakh',
        acronym: 'kk',
      },
      {
        name: 'Khmer',
        acronym: 'km',
      },
      {
        name: 'Korean',
        acronym: 'ko',
      },
      {
        name: 'Kurdish',
        acronym: 'ku',
      },
      {
        name: 'Kyrgyz',
        acronym: 'ky',
      },
      {
        name: 'Lao',
        acronym: 'lo',
      },
      {
        name: 'Latin',
        acronym: 'la',
      },
      {
        name: 'Latvian',
        acronym: 'lv',
      },
      {
        name: 'Lithuanian',
        acronym: 'lt',
      },
      {
        name: 'Luxembourgish',
        acronym: 'lb',
      },
      {
        name: 'Macedonian',
        acronym: 'mk',
      },
      {
        name: 'Malagasy',
        acronym: 'mg',
      },
      {
        name: 'Malay',
        acronym: 'ms',
      },
      {
        name: 'Malayalam',
        acronym: 'ml',
      },
      {
        name: 'Maltese',
        acronym: 'mt',
      },
      {
        name: 'Maori',
        acronym: 'mi',
      },
      {
        name: 'Marathi',
        acronym: 'mr',
      },
      {
        name: 'Mongolian',
        acronym: 'mn',
      },
      {
        name: 'Myanmar (Burmese)',
        acronym: 'my',
      },
      {
        name: 'Nepali',
        acronym: 'ne',
      },
      {
        name: 'Norwegian',
        acronym: 'no',
      },
      {
        name: 'Nyanja (Chichewa)',
        acronym: 'ny',
      },
      {
        name: 'Pashto',
        acronym: 'ps',
      },
      {
        name: 'Persian',
        acronym: 'fa',
      },
      {
        name: 'Polish',
        acronym: 'pl',
      },
      {
        name: 'Portuguese (Portugal, Brazil)',
        acronym: 'pt',
      },
      {
        name: 'Punjabi',
        acronym: 'pa',
      },
      {
        name: 'Romanian',
        acronym: 'ro',
      },
      {
        name: 'Russian',
        acronym: 'ru',
      },
      {
        name: 'Samoan',
        acronym: 'sm',
      },
      {
        name: 'Scots Gaelic',
        acronym: 'gd',
      },
      {
        name: 'Serbian',
        acronym: 'sr',
      },
      {
        name: 'Sesotho',
        acronym: 'st',
      },
      {
        name: 'Shona',
        acronym: 'sn',
      },
      {
        name: 'Sindhi',
        acronym: 'sd',
      },
      {
        name: 'Sinhala (Sinhalese)',
        acronym: 'si',
      },
      {
        name: 'Slovak',
        acronym: 'sk',
      },
      {
        name: 'Slovenian',
        acronym: 'sl',
      },
      {
        name: 'Somali',
        acronym: 'so',
      },
      {
        name: 'Spanish',
        acronym: 'es',
      },
      {
        name: 'Sundanese',
        acronym: 'su',
      },
      {
        name: 'Swahili',
        acronym: 'sw',
      },
      {
        name: 'Swedish',
        acronym: 'sv',
      },
      {
        name: 'Tagalog (Filipino)',
        acronym: 'tl',
      },
      {
        name: 'Tajik',
        acronym: 'tg',
      },
      {
        name: 'Tamil',
        acronym: 'ta',
      },
      {
        name: 'Telugu',
        acronym: 'te',
      },
      {
        name: 'Thai',
        acronym: 'th',
      },
      {
        name: 'Turkish',
        acronym: 'tr',
      },
      {
        name: 'Ukrainian',
        acronym: 'uk',
      },
      {
        name: 'Urdu',
        acronym: 'ur',
      },
      {
        name: 'Uzbek',
        acronym: 'uz',
      },
      {
        name: 'Vietnamese',
        acronym: 'vi',
      },
      {
        name: 'Welsh',
        acronym: 'cy',
      },
      {
        name: 'Xhosa',
        acronym: 'xh',
      },
      {
        name: 'Yiddish',
        acronym: 'yi',
      },
      {
        name: 'Yoruba',
        acronym: 'yo',
      },
      {
        name: 'Zulu',
        acronym: 'zu',
      }
    ];

  ngOnInit() {
    this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
      console.log(lang);
    }); 
    console.log(this.actual_language);
	this.translate();
  }

  changeLanguage(){
    //console.log(this.mylanguage.split('('));
    if (this.mylanguage != undefined) {
      let l = this.mylanguage.split('(');
      l = l[l.length -1].split(')'); 
      //console.log(l[0]);
      this.storage.set('language', l[0]);
    }
  }

async translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,this.actual_language,token).subscribe(res => {
			this.words = res;
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return await this.words;
}

  closePopover() {
    this.popoverController.dismiss();
  }

  LogOut() {
    this.auth.logOut();
    this.nav.navigateRoot(`/login`);
    this.closePopover();
  }

  ChangePassword() {
    //console.log("Clic on Change Password")
    this.openModal();
  }

  ChangeToggleNotifications(){
    this.storage.set('toggle-notifications', this.notific);
  }
  
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-changePW-modal-css'
    });
    return await modal.present();
  }

  DeleteProfile() {
    this.presentAlert_D();
    this.closePopover();
  }

  async presentAlert_D() {
    const alert = await this.alertController.create({
      header: this.words[6],
      message: this.words[7],
      inputs: [
        {
          name: 'password',
          placeholder: this.words[8], 
          type: 'password'
        }
      ],
      buttons: [
        {
        text: this.words[9],
        role: 'cancel'
        },
        {
          text: this.words[10],
          // funcionalitat de esborar perfil
          handler: esborrar => {
            if (esborrar.password !== '') {
              const hashPassword = Md5.hashAsciiStr('petsitterplot420 ' + esborrar.password);
              console.log(hashPassword);
              const data: any = {
                password: hashPassword
              };
              let bool = true;
              this.auth.getToken().then(result => {
                const token = result;
                console.log('token: ' + token);
                this.auth.deleteAccount(data, token).
                    subscribe(res => {
                      this.global.token = '';
                      this.LogOut();
                    }, err => {
                      console.log(err);
                      bool = false;
                      this.presentToast(this.words[11]);
                    });
              }).catch(err => {
                console.log(err);
                return throwError;
              });
              return bool;
            } else {
              this.presentToast(this.words[12]);
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    await toast.present();
  }

}

