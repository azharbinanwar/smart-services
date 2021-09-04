import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
@Input() data: any;
  constructor () { 
  }
  ngOnInit() {
    console.log(this.data.hintLine);
  }

}
