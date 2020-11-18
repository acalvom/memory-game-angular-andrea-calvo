import { Component, OnInit } from '@angular/core';
import {PreferencesmanagerService} from '../shared/services/preferencesmanager.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  values: number[] = [];
  cartasSeleccionadas: number[] = [];
  cartasSeleccionadasIds: number[] = [];
  cartasVoletadas = 0;

  numberOfCards = 0;
  timeLimit = 0;
  score = 0;
  countdown = 0;
  currentTime = 0;
  loadedPreferences: string | null= '';

  constructor(private preferences: PreferencesmanagerService) { }

  readPreferences(): void {
    //const preferences = sessionStorage.getItem('preferences');
    this.loadedPreferences = this.preferences.getPreferences();
    if (this.loadedPreferences == null){
      this.numberOfCards = 20;
      this.timeLimit = 0;
    } else {
      const preferencesArray = this.loadedPreferences.split(',').map(Number);
      if (preferencesArray[0] === 0 && preferencesArray[1] === 0){
        this.numberOfCards = 20;
        this.timeLimit = 0;
      }else {
        this.numberOfCards = preferencesArray[0];
        this.timeLimit = preferencesArray[1];
      }
      console.log(this.numberOfCards, this.timeLimit);
    }
    this.currentTime = this.timeLimit;
    this.positionVector();
  }

  positionVector(): void {
    let end = 0;
    let randomNumber = 0;
    this.values = [];
    while (end !== this.numberOfCards) {
      for (let i = 0; i <= (this.numberOfCards - 1); i++) {
        randomNumber = Math.round(Math.random() * (this.numberOfCards - 1));
        if (this.values.indexOf(randomNumber) === -1) {
          this.values.push(randomNumber);
          end++;
        }
      }
    }

    for (let i = 0; i < this.numberOfCards; i++) {
      randomNumber = this.values[i];
      if (randomNumber > ((this.numberOfCards / 2)) - 1) {
        this.values[i] = randomNumber - (this.numberOfCards / 2);
      } else {
        this.values[i] = randomNumber;
      }
    }
    console.log(this.values);
  }

  ngOnInit(): void {
    this.readPreferences();
  }

}
