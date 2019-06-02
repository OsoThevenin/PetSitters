import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.page.html',
  styleUrls: ['./trophies.page.scss'],
})
export class TrophiesPage {
  
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

}
