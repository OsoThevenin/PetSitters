import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatsService } from 'src/app/providers/chats/chats.service';
import { AuthProviderService } from 'src/app/providers/auth/auth-provider.service';
import { throwError } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-solicitud',
  templateUrl: './modal-solicitud.page.html',
  styleUrls: ['./modal-solicitud.page.scss'],
})
export class ModalSolicitudPage implements OnInit {

	solicitudForm: FormGroup;

	@ViewChild('dataInici') dI;
	@ViewChild('dataFinal') dF;
	@ViewChild('animalName') aN;
	@ViewChild('animalSelected') aS;
	@ViewChild('feedback') fb;


	public cuidadorContrato: any;

  constructor( public formBuilder: FormBuilder,private modalController: ModalController,private chats: ChatsService, private auth: AuthProviderService, private navParams: NavParams) { 

		this.solicitudForm = this.formBuilder.group({
      anfcn: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[A-ZΆ-ΫÀ-ÖØ-Þa-zά-ώß-öø-ÿ ]+$') 
      ])),
      asfcn: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sdfcn: new FormControl('', Validators.compose([
        Validators.required
      ])),
      edfcn: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
	}

  enviaSolicitud(): any {

		let diaI = this.dI.value.substring(8,10);
    let mesI = this.dI.value.substring(4,7);
		let anyI = this.dI.value.substring(0,4);
		let a = diaI.concat(mesI,'-',anyI);

		let horaI = this.dI.value.substring(11,16);
		a=a.concat(", ");
    a = a.concat(horaI);

		let diaF = this.dF.value.substring(8,10);
    let mesF = this.dF.value.substring(4,7);
		let anyF = this.dF.value.substring(0,4);
		let b = diaF.concat(mesF,'-',anyF);

		let horaF = this.dF.value.substring(11,16);
		b=b.concat(", ");
    b = b.concat(horaF);

	this.auth.getToken().then(result => {
    const token = result;
	let body: any = {
	  animal: [{
		name: this.aN.value,
		tipus: this.aS.value
		}],
	  end: a,
	  feedback: this.fb.value,
	  start: b,
	  username: this.cuidadorContrato,
	};
	this.chats.proposeContract(body,token).subscribe(res =>{
		console.log(res); //Daniel: deberia devolver null cuando no hay contratos y algo diferente cuando los hay, parece que en backend no funciona, hay que comentarlo con antoni.
	});
	}).catch(err => {
	  console.log(err);
	 return throwError;
	});
	this.modalController.dismiss();
  }

  ngOnInit() {
		this.cuidadorContrato = this.navParams.get('usernameCuidador');
  }

  Cancel() {
    this.modalController.dismiss();
  }

}
