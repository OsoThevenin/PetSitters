import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking = [
    {
      profile_pic: null,
      name: "Alexandra Volkova",
      trophies: 45
    },
    {
      profile_pic: null,
      name: "Daniel Esquina",
      trophies: 42
    },
    {
      profile_pic: null,
      name: "Ruben Gonzalez",
      trophies: 39
    }
  ]

  constructor() { }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }

}
