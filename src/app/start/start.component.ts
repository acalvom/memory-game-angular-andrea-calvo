import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  updateClock(): void {

  }

  constructor() {
  }

  ngOnInit(): void {
    // onload
    // setInterval(this.updateClock, 1000);
  }

}
