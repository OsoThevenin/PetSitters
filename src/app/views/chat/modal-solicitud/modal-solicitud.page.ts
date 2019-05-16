import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatsService } from 'src/app/providers/chats/chats.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-solicitud',
  templateUrl: './modal-solicitud.page.html',
  styleUrls: ['./modal-solicitud.page.scss'],
})
export class ModalSolicitudPage implements OnInit {

	@ViewChild('dataInici') dI;
	@ViewChild('dataFinal') dF;

  public animalName: string;
  public animalSelected: string;
  public startDate = new Date().toISOString();
  public startHour: string;
  public endDate = new Date().toISOString();
  public endHour: string;
	public feedback: boolean;
	public cuidadorContrato: any;

  constructor(private modalController: ModalController,private chats: ChatsService, private auth: AuthProviderService, private navParams: NavParams) { }

  enviaSolicitud(): any {

		console.log(this.dI.value);
		console.log(this.dF.value);

		let dia=this.dI.value.substring(5,8);
		//let mes=this.dI.substring(8,11);
		/*
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
	  username: this.cuidadorContrato,
	};
	console.log(body);
	this.chats.proposeContract(body,token).subscribe(res =>{
	  console.log(res);
	});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});*/
  }

  ngOnInit() {
		this.cuidadorContrato = this.navParams.get('usernameCuidador');
  }

  Cancel() {
    this.modalController.dismiss();
  }

  dateChanged(date) {
    console.log(date.detail.value);
    //console.log(this.myDate);
	}

}
