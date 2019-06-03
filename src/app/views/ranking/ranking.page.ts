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
      puntuation: 444
    },
    {
      profile_pic: null,
      name: "Daniel Esquina",
      puntuation: 333
    },
    {
      profile_pic: null,
      name: "Ruben Gonzalez",
      puntuation: 222
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
