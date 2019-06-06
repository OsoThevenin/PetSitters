import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from 'src/app/providers/Search/search.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage{
  public searchTerm: string = "";
  public searchFilter: string;
  public expertFilter: string;
  public valorationLowerBoundary: string ="";
  public valorationUpperBoundary: string ="";
  public obj: any = '{"lower": "0", "upper": "5"}';
  public stars = JSON.parse(this.obj);
  public words: Array<string> = ["Filter by:", "Name", "Expert", "Distance", "Favorites", "Rating", "With expertise in:", "Dogs", "Cats", "Ferrets", "Reptiles", "Birds", "Rodents", "Fishes", "Amphibians", "Arthropods", "Other"]

  constructor(private nav: NavController, private search: SearchService, private auth: AuthProviderService) {
  }

   /* {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
    {avatar: '../../../assets/default_avatar.png', stars: 'Star rating', nombre: 'Firstname, Lastname'},
];*/

perfilsCuidadors = this.devuelvePerfilesCuidadores();

translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,this.actual_language,token).subscribe(res => {
			this.words = res;
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.words;
}

doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

actual_language: string;
  ngOnInit() {
    // obtener username mio
	this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
    }); 
	console.log(this.actual_language);
	this.translate();
	}

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
}
