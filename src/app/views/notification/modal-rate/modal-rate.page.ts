import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-rate',
  templateUrl: './modal-rate.page.html',
  styleUrls: ['./modal-rate.page.scss'],
})
export class ModalRatePage implements OnInit {

  @ViewChild('stars') stars;

  constructor() { }

  cancel(){

  }

  rate(){
    
  }

  ngOnInit() {
  }

}
