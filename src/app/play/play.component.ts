import { Component, OnInit } from '@angular/core';
import {PreferencesmanagerService} from '../shared/services/preferencesmanager.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  values: number[] = [];
  selectedCards: number[] = [];
  selectedCardsIds: number[] = [];
  flippedCards = 0;
  cards: string [] = [];

  numberOfCards = 0;
  timeLimit = 0;
  currentScore = 0;
  countdown: any;
  remainingTime = 0;
  loadedPreferences: string | null= '';
  output = '';

  constructor(private preferences: PreferencesmanagerService) { }

  readPreferences(): void {
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
    this.remainingTime = this.timeLimit;
    this.positionVector();
  }

  positionVector(): void {
    let end = 0;
    let randomNumber = 0;
    this.values = [];
    while (end !== this.numberOfCards) {
      for (let i = 0; i <= (this.numberOfCards - 1); i++) {
        randomNumber = Math.round(Math.random() * (this.numberOfCards - 1));
        //this.cards[i] = 'card_' + i + '.jpg)';
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

  restartGame(): void {

  }

  timer(): void {
    this.countdown = setInterval( () => {
      if (this.remainingTime <= 0) {
        clearInterval(this.countdown);
        this.currentScore = 0;
        alert("YOU LOOSE!");
      }
      this.remainingTime -= 1;
    }, 1000);
  }

  newGame(): void {
    this.readPreferences();
    this.currentScore = 0;
    this.flippedCards = 0;
    if (this.timeLimit != 0) {
      this.timer();
    }
    this.positionVector();

    for (let i = 0; i < this.numberOfCards; i++) {
      this.cards[i] = 'card_' + i + '.jpg)';
      //this.output = this.output + '<div id="carta_' + i + '" (click)="flipCards(this,\'' + this.values[i] + '\')"></div>';
    }
    console.log(this.cards,this.values);
  }

  ngOnInit(): void {
    this.newGame();
  }

}
