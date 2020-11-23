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

  constructor(private router: Router, private preferences: PreferencesmanagerService) { }

  acceptPreferences(): void {
    this.preferences.setPreferences(this.numberOfCards, this.timeLimit);
    this.router.navigate(['play']);
  }

  ngOnInit(): void {
  }

}
