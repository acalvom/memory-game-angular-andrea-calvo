import { Component, OnInit } from '@angular/core';
import {PreferencesmanagerService} from '../shared/services/preferencesmanager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  numberOfCards = 0;
  timeLimit = 0;
  //preferences: number[] = [];

  constructor(private router: Router, private preferences: PreferencesmanagerService) { }

  acceptPreferences(): void {
    console.log(this.numberOfCards, this.timeLimit);
    this.preferences.setPreferences(this.numberOfCards, this.timeLimit);
    //this.preferences = [this.numberOfCards, this.timeLimit];
    console.log(this.preferences);
    this.router.navigate(['play']);
    //sessionStorage.setItem('preferences', String((this.preferences)));
  }

  ngOnInit(): void {
  }

}
