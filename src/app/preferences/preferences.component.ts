import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  numberOfCards = 0;
  timeLimit = 0;
  preferences: number[] = [];

  constructor() { }

  acceptPreferences(): void {
    console.log(this.numberOfCards, this.timeLimit);
    this.preferences = [this.numberOfCards, this.timeLimit];
    console.log(this.preferences);
    sessionStorage.setItem('preferences', String((this.preferences)));
  }

  ngOnInit(): void {
  }

}
