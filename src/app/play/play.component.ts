import {Component, OnInit} from '@angular/core';
import {PreferencesmanagerService} from '../shared/services/preferencesmanager.service';
import {UsersrestService} from '../shared/services/usersrest.service';
import {card} from '../shared/models/card.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  values: number[] = [];
  selectedCards: card[] = [];
  selectedCardsIds: number[] = [];
  flippedCards = 0;
  cards: string [] = [];

  numberOfCards = 0;
  matchedCards = 0;
  timeLimit = 0;
  currentScore = 0;
  countdown: any;
  remainingTime = 0;
  loadedPreferences: string | null = '';
  loadedUserToken: string | null = '';
  cardList: card[] = [];


  cardID = 0;
  cardSrc = '';
  isWinner: boolean = false;
  registeredUser: boolean = false;


  constructor(private preferences: PreferencesmanagerService, private usersrestService: UsersrestService) {
  }

  readPreferences(): void {
    this.loadedPreferences = this.preferences.getPreferences();
    if (this.loadedPreferences == null) {
      this.numberOfCards = 20;
      this.timeLimit = 0;
    } else {
      const preferencesArray = this.loadedPreferences.split(',').map(Number);
      if (preferencesArray[0] === 0 && preferencesArray[1] === 0) {
        this.numberOfCards = 20;
        this.timeLimit = 0;
      } else {
        this.numberOfCards = preferencesArray[0];
        this.timeLimit = preferencesArray[1];
      }
      //this.numberOfCards = 4;
      //this.timeLimit = 60;
      //console.log(this.numberOfCards, this.timeLimit);
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
      this.cards[i] = 'assets/naipes/img_' + this.values[i] + '.jpg';
      this.createBoard(i);
    }
    console.log(this.values, this.cards);
    console.log(this.cardList);
  }

  restartGame(): void {

  }

  timer(): void {
    this.countdown = setInterval(() => {
      if (this.remainingTime <= 0) {
        clearInterval(this.countdown);
        alert('YOU LOOSE!');
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
  }

  ngOnInit(): void {
    this.newGame();
    this.loadUser();
  }

  loadUser() {
    this.loadedUserToken = this.usersrestService.getUserToken();
    //console.log(this.loadedUserToken);
    this.registeredUser = this.loadedUserToken != null;
  }

  flipCard(flippedCard: card): void {
    console.log(this.flippedCards);
    flippedCard.shown = flippedCard.src;
    if (this.flippedCards == 0) {
      this.selectedCards.push(flippedCard);
      this.flippedCards++;
    } else if (this.flippedCards == 1) {
      this.selectedCards.push(flippedCard);
      console.log('Dos cartas', this.selectedCards);
      this.checkCards(this.selectedCards);
      this.flippedCards = 0;
    }
  }

  checkCards(pickedCards: card[]): void {
    if (pickedCards[0].cardId == pickedCards[1].cardId) {
      console.log('SAME CARDS');
      this.currentScore += 15;
      this.matchedCards += 2;
      this.checkWinner(this.matchedCards);
    } else {
      console.log('DIFFERENT CARDS');
      this.currentScore -= 5;
      setTimeout(() => {
        this.flipBack(pickedCards);
      }, 800);
    }
    this.selectedCards = [];
  }

  flipBack(pickedCards: card[]) {
    pickedCards[0].shown = pickedCards[0].reverse;
    pickedCards[1].shown = pickedCards[1].reverse;
  }

  checkWinner(matchedCards: number) {
    if (matchedCards == this.numberOfCards) {
      this.extraScore();
      clearInterval(this.countdown);
      this.isWinner = true;
    }
  }

  createBoard(index: number) {
    let oneCard: card = new card();
    oneCard.cardId = this.values[index];
    oneCard.src = this.cards[index];
    oneCard.reverse = 'assets/naipes/fondo_espacio.jpg';
    oneCard.shown = oneCard.reverse;
    oneCard.state = 0;
    this.cardList[index] = (oneCard);
  }

  extraScore() {
    if (this.numberOfCards == 26) {
      this.currentScore = this.currentScore + 25;
    } else if (this.numberOfCards == 32) {
      this.currentScore = this.currentScore + 50;
    }

    if (this.timeLimit == 150) {
      this.currentScore = this.currentScore + 25;
    } else if (this.timeLimit == 120) {
      this.currentScore = this.currentScore + 50;
    } else if (this.timeLimit == 90) {
      this.currentScore = this.currentScore + 75;
    } else if (this.timeLimit == 60) {
      this.currentScore = this.currentScore + 100;
    }
  }

  saveScore() {

  }
}
