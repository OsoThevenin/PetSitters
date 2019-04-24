import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.page.html',
  styleUrls: ['./email-confirm.page.scss'],
})
export class EmailConfirmPage implements OnInit {

  constructor(private router: Router) { }

  continue() {
    this.router.navigateByUrl('/login');
  }
  resend() {
    console.log("Clickado el boton resend");
  }
  ngOnInit() {
  }

}
