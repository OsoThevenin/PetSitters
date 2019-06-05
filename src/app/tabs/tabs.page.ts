import { Storage } from '@ionic/storage';
import { Component, Init } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthProviderService } from '../providers/auth/auth-provider.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public words: Array<string> = ["Chat", "Search", "Taskboard", "Ranking", "Profile"]
  numnotifications = 0;
  mostrarnotif: any;

  constructor(private storage: Storage, private nav: NavController, private auth: AuthProviderService) {
    this.storage.get('token').then((val) => {
      if (val === null) {
        this.nav.navigateRoot(`/login`);
      }
    });
    this.auth.gettogglenotifications().then(res => {
      this.mostrarnotif = res;
      console.log(this.mostrarnotif);
    })
    this.getNumNot();
  }
  getNumNot(){
    console.log("busca notificaciones");
    this.auth.getToken().then(result => {
      const token = result;
      if(result != null){
      this.auth.getNotifications(token).subscribe(res => {
      console.log(res);
      let count = 0;
      res.forEach(element => {
      if( element == true) count++;
      });
      this.numnotifications = count;
      });
    }
    }).catch(err => {
      console.log(err);
    });
  }
	actual_language: string;
    ngOnInit() {
    this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
      console.log(lang);
    }); 
    console.log(this.actual_language);
	this.translate();
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

}
