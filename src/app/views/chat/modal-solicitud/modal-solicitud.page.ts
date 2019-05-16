import { Component, OnInit } from '@angular/core';
import {ChatsService } from 'src/app/providers/chats/chats.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-modal-solicitud',
  templateUrl: './modal-solicitud.page.html',
  styleUrls: ['./modal-solicitud.page.scss'],
})
export class ModalSolicitudPage implements OnInit {
  public animalName: string;
  public animalSelected: string;
  public startDate = new Date().toISOString();
  public startHour: string;
  public endDate = new Date().toISOString();
  public endHour: string;
  public feedback: boolean;

  constructor(private chats: ChatsService, private auth: AuthProviderService) { }

  enviaSolicitud(): any {
	console.log("Envia algo");
	console.log(this.startDate.substring(5,10));
	console.log(this.startHour);


	this.auth.getToken().then(result => {
    const token = result;
	let startTime=this.startDate.substring(5,10)+" "+this.startHour;
	let endTime=this.endDate.substring(5,10)+" "+this.endHour;
	//console.log(endTime);
	let body: any = {
	  animal: [{
		name: this.animalName,
		tipus: this.animalSelected
		}],
	  end: endTime,
	  feedback: this.feedback,
	  start: startTime,
	  username: "daniel",
	};
	console.log(body);
	this.chats.proposeContract(body,token).subscribe(res =>{
	  console.log(res);
	});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
  }

  ngOnInit() {
  }

  dateChanged(date) {
    console.log(date.detail.value);
    //console.log(this.myDate);
}

}
