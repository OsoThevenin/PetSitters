import { PopoverController, ModalController, ActionSheetController, Platform, ToastController} from '@ionic/angular';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { Router } from '@angular/router';
import { PopoverPage } from './popover/popover.page';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/providers/Search/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './../../shared/global.service';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProfileService } from 'src/app/providers/profile/profile.service';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageService } from 'src/app/services/image/image.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImageCompressorService } from 'src/app/services/compression.service';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

const PETSITTERS_DIRECTORY = 'PetSitters';
const PROFILE_IMAGE = 'ProfileImage';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  public words: Array<string> = ["Description", "Please enter a description", "Availability", "From:", "To:", "Expert on", "Dogs", "Cats", "Ferrets", "Reptiles", "Birds", "Rodents", "Fishes", "Amphibians", "Arthropods", "Other", "Please select the animals you are willing to take care of", "Previous Ratings"]
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

  horasForm: FormGroup;
  diaActual: any = this.monday;

  showExpert:boolean = false;

  disableSegmentBool:boolean = false;
  botonEditar:boolean = true;
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
    availability: null,
    commentaries: null,
    description: null,
    localization: null,
    name: null,
    profile_image: "",
    stars: 0,
    username: null,
    expert: "",
  };

  editable: boolean = false;
  expertEditable: boolean = false;

  @ViewChild('description') desc;
 // @ViewChild('expert') exp;
  @ViewChild('from') f;
  @ViewChild('to') t;

  compression: ImageCompressorService = new ImageCompressorService();

  constructor(private popoverCtrl: PopoverController, private auth: AuthProviderService, private actrout: ActivatedRoute,
    private search: SearchService,private modalCtrl:ModalController , private global: GlobalService,
    private router: Router, private profile: ProfileService, private actionSheetController: ActionSheetController,
     private storage: Storage, public formBuilder: FormBuilder, private camera: Camera,
     private platform: Platform, private toastController: ToastController, private imageService: ImageService,
     private imagePicker: ImagePicker, private file: File, private webview: WebView, private ref: ChangeDetectorRef) {
      this.horasForm = this.formBuilder.group({
        fromfcn: new FormControl('', Validators.compose([
          Validators.required
        ])),
        tofcn: new FormControl('', Validators.compose([
          Validators.required 
        ]))
      });
     }

  my_trophies_3 = [];//this.getTrofies();

  /*
  async getTrofies() {
    this.auth.getToken().then(result => {
      const token = result;
      this.auth.getTrophies(token).subscribe(res => {
        this.my_trophies_3 =  this.where_true(res);
        console.log("my_trophies_3", this.my_trophies_3);
        //console.log(this.my_trophies[this.trophies[13].id]);
      });
    }).catch(err => {
      console.log(err);
    });
    return await this.my_trophies_3;
  }
  */

 doRefresh(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    this.ngOnInit();
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}

  where_true(vector){
    let count = [];
    for (let i = 0; i < vector.length && count.length < 3; i++) {
      if (vector[i] == true) count.push(i);
    } 
    //console.log("count: ", count);
    return count;
  }


  seeTrophies() {
    this.router.navigateByUrl('/trophies');
  }


  EditText() {
    this.editable = true;
  }

  NoEditText() {
    this.editable = false;
    this.ngOnInit();
  }


  EditExpert(){
    this.expertEditable = true;
  }

  NoEditExpert(){

    this.expertEditable = false;
    this.ngOnInit();
  }
  TakeTextDescription() {
    // Coger el valor nuevo y enviar a backend
    let body = {
      "thing": this.desc.value
    };
    if(this.desc.value=="") body.thing = null;
    const atr: string = "description";
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
    let body = {
      "thing": this.monday.from + ',' + this.monday.to + ',' 
      + this.tuesday.from + ',' + this.tuesday.to + ',' 
      + this.wednesday.from + ',' + this.wednesday.to + ',' 
      + this.thursday.from + ',' + this.thursday.to + ',' 
      + this.friday.from + ',' + this.friday.to + ',' 
      + this.saturday.from + ',' + this.saturday.to + ',' 
      + this.sunday.from + ',' + this.sunday.to + ','
    };

    const atr: string = "availability";
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
      //this.availabilityEditable = false;
    }
  TakeTextExpert() {
    // Coger el valor nuevo y enviar a backend
    //if(this.expertise[0].isChecked == false && this.expertise[1].isChecked == false && this.expertise[2].isChecked == false && this.expertise[3].isChecked == false && this.expertise[4].isChecked == false && this.expertise[5].isChecked == false && this.expertise[6].isChecked == false && this.expertise[7].isChecked == false) this.hazlista=false;
    //else this.hazlista=true;
    this.traducirDeExpertise();
    let body = {
      "thing": this.cuidador.expert
    };
    if(this.cuidador.expert=="") body.thing = null;
    console.log("esto se envia",body);
    const atr: string = "expert";
    console.log(this.expertise);
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
      console.log("cuidadorExpert: ",this.cuidador.expert);
      console.log("Expertise:  ",this.expertise);
  }

  traducirDeExpertise(){
    let hay=false;
    this.cuidador.expert="";
	for(let i = 0; i<10; i++){
		if(this.expertiseTranslated[i].isChecked==true){
			hay=true;
			this.cuidador.expert+=this.expertise[i].type + "''";
		}
	}
    this.hazlista=hay;
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
    // obtener username mio
	this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
    }); 
	this.translate();
    this.previousVal = this.getPreviousVal();
    this.auth.getUsername().then(uname => {
    const username = uname;
    

   // this.actrout.snapshot.paramMap.get('username');
    this.auth.getToken().then(result => {
      const token = result;
      // De momento usa el provider de search!!
      this.search.getUser(username, token).subscribe(res => {
        console.log('cuidadorResult: ' + JSON.stringify(res));
        this.cuidador = res;
        this.traducirAExpertise();
        console.log(this.expertise);
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
    }).catch(err => {
      console.log(err);
      return throwError;
    });
    }); 
    
    this.auth.getToken().then(result => {
      const token = result;
      this.auth.getTrophies(token).subscribe(res => {
        this.my_trophies_3 =  this.where_true(res);
        console.log("my_trophies_3", this.my_trophies_3);
        //console.log(this.my_trophies[this.trophies[13].id]);
      });
    }).catch(err => {
      console.log(err);
    });
    this.getProfileImage();
  }

  getProfileImage() {
    setTimeout(() => {
      this.downloadImageData();
    }, 3000);
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
    this.disableSegmentBool=true;
    this.readonlyBool=false;
    this.botonEditar=false;
    this.f.value=this.diaActual.from;
    this.t.value=this.diaActual.to;
  }

  guardarButton(){
    let f1=this.f.value;
    let t1=this.t.value;
    if(this.f.value.length > 5) {
      f1=this.f.value.substring(11,16);
      t1=this.t.value.substring(11,16);
    }
    if(this.day=="Mon") {
      this.monday.from=f1;
      this.monday.to=t1;
    }
    else if(this.day=="Tue") {
      this.tuesday.from=f1;
      this.tuesday.to=t1;
    }
    else if(this.day=="Wed") {
      this.wednesday.from=f1;
      this.wednesday.to=t1;
    }
    else if(this.day=="Thu") {
      this.thursday.from=f1;
      this.thursday.to=t1;
    }
    else if(this.day=="Fri") {
      this.friday.from=f1;
      this.friday.to=t1;
    }
    else if(this.day=="Sat") {
      this.saturday.from=f1;
      this.saturday.to=t1;
    }
    else if(this.day=="Sun") {
      this.saturday.from=f1;
      this.saturday.to=t1;
    }

    this.TakeAvailability();

    //this.f.value="";
    //this.t.value="";

    this.readonlyBool=true;
    this.botonEditar=true;
    
    this.disableSegmentBool=false;
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
        this.downloadProfileImages();
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

  // Image profile


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.openGallery();
        }
      },
      {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: true,
        correctOrientation: true,
      };

      this.camera.getPicture(options).then(imagePath => {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let generatedName: string = this.createFileName();
        this.imageService.getToken().then((token) => {
          return this.imageService.uploadProfileImage(correctPath + currentName, token);
        }).then((data) => {
          this.presentToast('Image sent correctly');
          console.log('Response chat:' + JSON.stringify(data));
          this.updateStoredImages(data.response);
        }).catch((err) => {
          console.log('Response imatge error: ' + JSON.stringify(err));
        });
      });
    } else {
      console.log(`I'm not in cordova`);
    }
  }

  openGallery() {
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 100
    };
    this.imagePicker.hasReadPermission().then(res => {
      if (res === false) {
        this.requestReadPermission();
      } else {
        this.imagePicker.getPictures(options).then((results) => {
          for (let i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              let currentName = results[i].substring(results[i].lastIndexOf('/') + 1);
              let correctPath = results[i].substring(0, results[i].lastIndexOf('/') + 1);
              let generatedName: string = this.createFileName();
              this.copyAndCompress(correctPath, currentName, generatedName).then((OutputDir:string) => {
                console.log("UPLOADING IMAGE: " + OutputDir);
                this.imageService.getToken().then((token) => {
                  return this.imageService.uploadProfileImage(OutputDir, token);
                }).then((data) => {
                  this.presentToast('Image sent correctly');
                  console.log('Response chat:' + JSON.stringify(data));
                });
              }).catch((err) => console.log('error in compression: ' + JSON.stringify(err)));
          }
        }, (err) => {
          this.presentToast('Error while opening the images');
        });
      }
    });
  }
  createFileName() {
    let d = new Date();
    let n = d.getTime();
    return (n + '.jpg');
  }


  async requestReadPermission() {
    this.imagePicker.requestReadPermission();
  }

  copyAndCompress(namePath, currentName, newFileName) {
    // Image Compression
    return new Promise((resolve, reject) => {
      let dataDirectory = this.file.externalRootDirectory + PETSITTERS_DIRECTORY + '/';
      let completePath: String = dataDirectory + newFileName;
      this.compression.compress(namePath + currentName).then((filePathOutput:string) => {
        let compressionDir = filePathOutput.substring(0, filePathOutput.lastIndexOf('/') + 1);
        let compressionFile = filePathOutput.substring(filePathOutput.lastIndexOf('/') + 1);
        this.file.removeFile(namePath, currentName).then(() => {this.file.removeFile(namePath, currentName)
          .catch(() => console.log('The temporal file has been successfully removed')); });
        this.file.moveFile(compressionDir, compressionFile, dataDirectory, newFileName).then(_ => {
          // Aquí s'ha de pujar les imatges a la memoria del telefon, amb la referencia del xat
          //this.updateStoredImages(newFileName, completePath);
        }, error => {
          console.log('Error while storing the image: ' + error);
          this.presentToast('Error while storing the image');
          reject(error);
        });
    })
    .catch(() => {console.log('Failure when compressiong the image.'); });
    });
  }


  updateStoredImages(imageKey) { // FilePath contains the complete path + name of the image
    this.imageService.getToken().then((token) => {
      this.imageService.getImageData(imageKey, token).then((response) => {
        let imagePath = this.webview.convertFileSrc(response.nativeURL);
        this.cuidador.profile_image = imagePath;
      });
    });
  

    // this.storage.set(PROFILE_IMAGE, resPath);
    this.ref.detectChanges(); // trigger change detection cycle
  }

  deleteImage() {
    this.storage.remove(PROFILE_IMAGE);
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  downloadImageData() {
    console.log('downloadImage is called');
    this.imageService.getToken().then((token) => {
      this.imageService.getImageData(this.cuidador.profile_image, token)
      .then((response) => {
        console.log('Imatge descarregada: ' + JSON.stringify(response));
        //let dataDirectory = this.file.externalApplicationStorageDirectory;
        //let url = dataDirectory + '/files/received/' + filename + '.jpg';

        let imagePath = this.webview.convertFileSrc(response.nativeURL);
        this.cuidador.profile_image = imagePath;

        console.log('imatge perfil actualitzada');
      }).catch((err) => {
        console.log('missatge imatge error: ' + JSON.stringify(err));
      });
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
  downloadProfileImages() {
    this.imageService.getToken().then((token) => {
      console.log('cuidadors: ' + JSON.stringify(this.previousVal));
      for (let profile of this.previousVal) {
        if(profile.profileImage !== null) {
          this.imageService.getImageData(profile.profileImage, token)
              .then((response) => {
                console.log('Imatge descarregada: ' + JSON.stringify(response));
                //let dataDirectory = this.file.externalApplicationStorageDirectory;
                //let url = dataDirectory + '/files/received/' + filename + '.jpg';
  
                let imagePath = this.webview.convertFileSrc(response.nativeURL);
                profile.profileImage = imagePath;
  
                console.log('imatge perfil actualitzada');
              }).catch((err) => {
                console.log('error al descarregar imatge de perfil de cuidador ' + profile.name);
              });
        }
      }
      this.ref.detectChanges();
    });
  }
}
