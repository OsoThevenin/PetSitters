import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking = []

  constructor(private auth: AuthProviderService) { }

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
}
