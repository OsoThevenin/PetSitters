import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { NavController } from '@ionic/angular';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.page.html',
  styleUrls: ['./trophies.page.scss'],
})
export class TrophiesPage {
  public words: Array<string> = ['Change the default profile pic \nFill the description field \nEnter an availability \nEnter an expertise',
  'Have a user as favourite pet sitter', 'Be someone’s favourite pet sitter', 
  'Take care of 1 animal of each type', 'Get all trophies',
  'Get 5 stars in rating', 'Get 4 stars in rating', 'Get 3 stars in rating',
  'Rate 1 sitter', 'Rate 5 sitters', 'Rate 10 sitters',
  'Send 100 texts', 'Send 500 texts', 'Send 1000 texts',
  'Hire a sitter who is 50km away from you', 'Take care of 1 animal who falls in the Other category',
  'Take care of 5 animals who falls in the Other category', 'Take care of 10 animals who falls in the Other category',
  'Take care of 1 dog', 'Take care of 5 dogs', 'Take care of 10 dogs', 
  'Take care of 1 cat', 'Take care of 5 cats', 'Take care of 10 cats', 
  'Take care of 1 ferret', 'Take care of 5 ferrets', 'Take care of 10 ferrets',
  'Take care of 1 reptile', 'Take care of 5 reptiles', 'Take care of 10 reptiles',
  'Take care of 1 bird', 'Take care of 5 bird', 'Take care of 10 bird',
  'Take care of 1 rodent', 'Take care of 5 rodents', 'Take care of 10 rodents',
  'Take care of 1 fish', 'Take care of 5 fish', 'Take care of 10 fish',
  'Take care of 1 amphibian', 'Take care of 5 amphibian', 'Take care of 10 amphibian',
  'Take care of 1 arthropod', 'Take care of 5 arthropod', 'Take care of 10 arthropod']
  
  public trophies = [
    { id: 0, name:'Getting to know each other', description: 'Change the default profile pic \nFill the description field \nEnter an availability \nEnter an expertise' },
    { id: 1, name:'Share your heart', description: 'Have a user as favourite pet sitter' },
    { id: 2, name:'Most Loved', description: 'Be someone’s favourite pet sitter' },
    { id: 3, name:'Animal Lover', description: 'Take care of 1 animal of each type' },
    { id: 4, name:'Platinum', description: 'Get all trophies' },
    { id: 5, name:'Challenger', description: 'Get 5 stars in rating' },
    { id: 6, name:'Diamond', description: 'Get 4 stars in rating' },
    { id: 7, name:'Gold', description: 'Get 3 stars in rating' },
    { id: 8, name:'Lots', description: 'Rate 1 sitter' },
    { id: 9, name:'Of', description: 'Rate 5 sitters' },
    { id: 10, name:'Thanks!', description: 'Rate 10 sitters' },
    { id: 11, name:'Communicative', description: 'Send 100 texts' },
    { id: 12, name:'Chatty', description: 'Send 500 texts' },
    { id: 13, name:'Talkative', description: 'Send 1000 texts' },
    { id: 14, name:'Traveler', description: 'Hire a sitter who is 50km away from you' },
    { id: 15, name:'Other Sitter', description: 'Take care of 1 animal who falls in the Other category' },
    { id: 16, name:'Other Enthusiastic', description: 'Take care of 5 animals who falls in the Other category' },
    { id: 17, name:'Chimera', description: 'Take care of 10 animals who falls in the Other category' },
    { id: 18, name:'Dog Sitter', description: 'Take care of 1 dog' },
    { id: 19, name:'Dog Enthusiastic', description: 'Take care of 5 dogs' },
    { id: 20, name:'Snoopy', description: 'Take care of 10 dogs' },
    { id: 21, name:'Cat Sitter', description: 'Take care of 1 cat' },
    { id: 22, name:'Cat Enthusiastic', description: 'Take care of 5 cats' },
    { id: 23, name:'Garfield', description: 'Take care of 10 cats' },
    { id: 24, name:'Ferret Sitter', description: 'Take care of 1 ferret' },
    { id: 25, name:'Ferret Enthusiastic', description: 'Take care of 5 ferrets' },
    { id: 26, name:'Furret', description: 'Take care of 10 ferrets' },
    { id: 27, name:'Reptile Sitter', description: 'Take care of 1 reptile' },
    { id: 28, name:'Reptile Enthusiastic', description: 'Take care of 5 reptiles' },
    { id: 29, name:'Ninja Turtle', description: 'Take care of 10 reptiles' },
    { id: 30, name:'Bird Sitter', description: 'Take care of 1 bird' },
    { id: 31, name:'Bird Enthusiastic', description: 'Take care of 5 bird' },
    { id: 32, name:'Donald', description: 'Take care of 10 bird' },
    { id: 33, name:'Rodent Sitter', description: 'Take care of 1 rodent' },
    { id: 34, name:'Rodent Enthusiastic', description: 'Take care of 5 rodents' },
    { id: 35, name:'Mickey Mouse', description: 'Take care of 10 rodents' },
    { id: 36, name:'Fish Sitter', description: 'Take care of 1 fish' },
    { id: 37, name:'Fish Enthusiastic', description: 'Take care of 5 fish' },
    { id: 38, name:'Nemo', description: 'Take care of 10 fish' },
    { id: 39, name:'Amphibian Sitter', description: 'Take care of 1 amphibian' },
    { id: 40, name:'Amphibian Enthusiastic', description: 'Take care of 5 amphibian' },
    { id: 41, name:'Kermit', description: 'Take care of 10 amphibian' },
    { id: 42, name:'Arthropod Sitter', description: 'Take care of 1 arthropod' },
    { id: 43, name:'Arthropod Enthusiastic', description: 'Take care of 5 arthropod' },
    { id: 44, name:'Ant-man', description: 'Take care of 10 arthropod' },
  ];

  constructor(private auth: AuthProviderService,private nav: NavController,) { }

  my_trophies = this.getTrofies();
  my_trophies_size = 0;
  //my_trophies[{{trophy.id}}]

  actual_language: string;
  ngOnInit() {
    // obtener username mio
	this.auth.getLanguage().then(lang => {
      this.actual_language = lang;
    }); 
	this.translate();
	}

  async getTrofies() {
    this.auth.getToken().then(result => {
      const token = result;
      this.auth.getTrophies(token).subscribe(res => {
        this.my_trophies = res;
        this.my_trophies_size = this.count_true(this.my_trophies);
        //console.log(this.my_trophies);
        //console.log(this.my_trophies[this.trophies[13].id]);
      });
    }).catch(err => {
      console.log(err);
    });
    return await this.my_trophies;
  }

  count_true(vector){
    let count = 0;
    vector.forEach(element => {
      if (element == true) count++;
    });
    //console.log(count);
    return count;
  }

  goBack() {
    this.nav.back();
  }

translate(){
this.auth.getToken().then(result => {
    const token = result;
	this.auth.translate(this.words,this.actual_language,token).subscribe(res => {
			this.words = res;
			 this.trophies = [
    { id: 0, name:'Getting to know each other', description: this.words[0] },
    { id: 1, name:'Share your heart', description: this.words[1] },
    { id: 2, name:'Most Loved', description: this.words[2] },
    { id: 3, name:'Animal Lover', description: this.words[3] },
    { id: 4, name:'Platinum', description: this.words[4] },
    { id: 5, name:'Challenger', description: this.words[5] },
    { id: 6, name:'Diamond', description: this.words[6] },
    { id: 7, name:'Gold', description: this.words[7] },
    { id: 8, name:'Lots', description: this.words[8] },
    { id: 9, name:'Of', description: this.words[9] },
    { id: 10, name:'Thanks!', description: this.words[10] },
    { id: 11, name:'Communicative', description: this.words[11] },
    { id: 12, name:'Chatty', description: this.words[12] },
    { id: 13, name:'Talkative', description: this.words[13] },
    { id: 14, name:'Traveler', description: this.words[14] },
    { id: 15, name:'Other Sitter', description: this.words[15] },
    { id: 16, name:'Other Enthusiastic', description: this.words[16] },
    { id: 17, name:'Chimera', description: this.words[17] },
    { id: 18, name:'Dog Sitter', description: this.words[18] },
    { id: 19, name:'Dog Enthusiastic', description: this.words[19] },
    { id: 20, name:'Snoopy', description: this.words[20] },
    { id: 21, name:'Cat Sitter', description: this.words[21] },
    { id: 22, name:'Cat Enthusiastic', description: this.words[22] },
    { id: 23, name:'Garfield', description: this.words[23] },
    { id: 24, name:'Ferret Sitter', description: this.words[24] },
    { id: 25, name:'Ferret Enthusiastic', description: this.words[25] },
    { id: 26, name:'Furret', description: this.words[26] },
    { id: 27, name:'Reptile Sitter', description: this.words[27] },
    { id: 28, name:'Reptile Enthusiastic', description: this.words[28] },
    { id: 29, name:'Ninja Turtle', description: this.words[29] },
    { id: 30, name:'Bird Sitter', description: this.words[30] },
    { id: 31, name:'Bird Enthusiastic', description: this.words[31] },
    { id: 32, name:'Donald', description: this.words[32] },
    { id: 33, name:'Rodent Sitter', description: this.words[33] },
    { id: 34, name:'Rodent Enthusiastic', description: this.words[34] },
    { id: 35, name:'Mickey Mouse', description: this.words[35] },
    { id: 36, name:'Fish Sitter', description: this.words[36] },
    { id: 37, name:'Fish Enthusiastic', description: this.words[37] },
    { id: 38, name:'Nemo', description: this.words[38] },
    { id: 39, name:'Amphibian Sitter', description: this.words[39] },
    { id: 40, name:'Amphibian Enthusiastic', description: this.words[40] },
    { id: 41, name:'Kermit', description: this.words[41] },
    { id: 42, name:'Arthropod Sitter', description: this.words[42] },
    { id: 43, name:'Arthropod Enthusiastic', description: this.words[43] },
    { id: 44, name:'Ant-man', description: this.words[44] },
  ];
		});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  
  return this.words;
}
}
