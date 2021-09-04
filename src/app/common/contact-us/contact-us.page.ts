import { CallNumber } from '@ionic-native/call-number/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(
    private callNumber: CallNumber,
  ) { }

  ngOnInit() {
  }
  contactUs() {
    this.callNumber.callNumber('+923164944177', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
