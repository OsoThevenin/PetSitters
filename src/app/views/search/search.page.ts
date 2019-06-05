import { ImageService } from './../../services/image/image.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from 'src/app/providers/Search/search.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit {
  public searchTerm: string = "";
  public searchFilter: string;
  public expertFilter: string;
  public valorationLowerBoundary: string ="";
  public valorationUpperBoundary: string ="";
  public obj: any = '{"lower": "0", "upper": "5"}';
  public stars = JSON.parse(this.obj);
	public perfilsCuidadors: any;

  constructor(
		private nav: NavController,
		private search: SearchService,
		private auth: AuthProviderService,
		private imageService: ImageService,
		private webview: WebView)
	{ }


	ngOnInit() {
		this.perfilsCuidadors = this.devuelvePerfilesCuidadores();
		this.downloadProfileImages();
	}

   /* {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
];*/

goToPerfilCuidador(cuidadorConcret) {
  /*console.log(cuidadorConcret.username);
  this.auth.getToken().then(result => {
    const token = result;
    console.log('token: ' + token);
    this.search.getUser(cuidadorConcret.username, token).subscribe(res => {
      console.log(res);
    });
  }).catch(err => {
    console.log(err);
    return throwError;
  });*/
  this.nav.navigateRoot(`tabs/search/perfil-cuidador/` + cuidadorConcret.username);
}

devuelvePerfilesCuidadores(): any {
  this.auth.getToken().then(result => {
    const token = result;
	if (this.searchFilter == "Favorites"){
		this.auth.getFavorites(token).subscribe(res => {
			this.perfilsCuidadors = res;
		});
	}
	else if (this.searchFilter == "Expert"){
			  this.search.filterExpert(this.expertFilter,token).subscribe(res => {
	  		  this.perfilsCuidadors = res;
			  });
			}
	else if (this.searchFilter == "Valoration"){
			  this.search.filterValoration(this.stars["lower"],this.stars["upper"],token).subscribe(res => {
	  		  this.perfilsCuidadors = res;
			  });
			}
	else{
		if (this.searchTerm != ""){
			if (this.searchFilter == "Name"){
			  this.search.filterName(this.searchTerm,token).subscribe(res => {
	  		  this.perfilsCuidadors = res;
			  });
			}
			
			else if (this.searchFilter == "Distance"){
			  this.search.filterDistance(this.searchTerm,token).subscribe(res => {
	  		  this.perfilsCuidadors = res;
			  });
			}
		}
		else{
		 console.log('token: ' + token);
		 this.search.getUsersList(token).subscribe(res => {
		   // console.log(res);
		   this.perfilsCuidadors = res;
		   // console.log(this.perfilsCuidadors);
		  });
		}
	}
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.perfilsCuidadors;
	}
	
	downloadProfileImages() {
		this.imageService.getToken().then((token) => {
			for (let profile of this.perfilsCuidadors) {
				this.imageService.getImageData(profile.profile_pic, token)
					.then((response) => {
						console.log('Imatge descarregada: ' + JSON.stringify(response));
						//let dataDirectory = this.file.externalApplicationStorageDirectory;
						//let url = dataDirectory + '/files/received/' + filename + '.jpg';

						let imagePath = this.webview.convertFileSrc(response.nativeURL);
						profile.profile_pic = imagePath;

						console.log('imatge perfil actualitzada');
					}).catch((err) => {
						console.log('error al descarregar imatge de perfil de cuidador ' + profile.name);
					});
			}
		});
	}
	
}
