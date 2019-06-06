import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking = []

  constructor(private auth: AuthProviderService, private imageService: ImageService, private webview: WebView, private ref: ChangeDetectorRef) { }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.ranking = this.getRanking();
    this.downloadProfileImages();
  }
  getRanking(): any {
    this.auth.getToken().then(result => {
      const token = result;
      this.auth.getRankingUsers(token).subscribe(res => {
	      console.log(res);
	      this.ranking = res;
	      console.log(this.ranking);
	    });
    }).catch(err => {
	    console.log(err);
	    return throwError;
    });
    return this.ranking;
  }

  downloadProfileImages() {
    this.imageService.getToken().then((token) => {
      console.log('cuidadors: ' + JSON.stringify(this.ranking));
      for (let profile of this.ranking) {
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
