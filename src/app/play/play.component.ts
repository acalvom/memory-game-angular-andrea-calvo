import {Component, OnInit} from '@angular/core';
import {PreferencesmanagerService} from '../shared/services/preferencesmanager.service';
import {UsersrestService} from '../shared/services/usersrest.service';
import {card} from '../shared/models/card.model';
import {Router} from '@angular/router';
import {RecordrestService} from '../shared/services/recordrest.service';
import {records} from '../shared/models/records.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  /* Paths */
  frontPath: string = 'assets/naipes/img_';
  reversePath: string = 'assets/naipes/fondo_espacio.jpg';

  /* Preferences parameters */
  numberOfCards;
  timeLimit;
  loadedPreferences: string | null = '';

  /* Play menu parameters */
  matchedCards;
  currentScore;
  remainingTime;
  gameStatus;

  /* User credentials */
  loadedUserToken: string | null = '';
  loggedUser: boolean = false;

  /* Internal parameters */
  values: number[];
  countdown: any;
  flippedCards;
  selectedCards: card[];
  cards: string [];
  cardList: card[];

  constructor(private router: Router,
              private preferences: PreferencesmanagerService,
              private usersrestService: UsersrestService,
              private recordrestService: RecordrestService) {
  }

  resetParameters(): void {
    this.numberOfCards = 0;
    this.timeLimit = 0;

    this.matchedCards = 0;
    this.currentScore = 0;
    this.remainingTime = 0;

    this.flippedCards = 0;
    this.gameStatus = 100;
    this.values = [];
    this.selectedCards = [];
    this.cards = [];
    this.cardList = [];
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
      this.numberOfCards = 4;
      //this.timeLimit = 10;
      //console.log(this.numberOfCards, this.timeLimit);
    }
    this.remainingTime = this.timeLimit;
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
      this.cards[i] = this.frontPath + this.values[i] + '.jpg';
      this.createBoard(i);
    }
    console.log(this.values, this.cards);
  }


  timer(): void {
    this.countdown = setInterval(() => {
      if (this.remainingTime == 0) {
        this.gameStatus = 400;
        clearInterval(this.countdown);
      }
      this.remainingTime -= 1;
    }, 1000);
  }

  newGame(): void {
    this.resetParameters();
    this.readPreferences();
    this.positionVector();
    if (this.timeLimit != 0) {
      this.timer();
    }
  }

  createBoard(index: number) {
    let oneCard: card = new card();
    oneCard.cardId = this.values[index];
    oneCard.src = this.cards[index];
    oneCard.reverse = this.reversePath;
    oneCard.shown = oneCard.reverse;
    oneCard.state = 0;
    this.cardList[index] = (oneCard);
  }

  flipCard(flippedCard: card): void {
    flippedCard.shown = flippedCard.src;
    if (this.flippedCards == 0) {
      this.selectedCards.push(flippedCard);
      this.flippedCards++;
    } else if (this.flippedCards == 1) {
      this.selectedCards.push(flippedCard);
      this.checkCards(this.selectedCards);
      this.flippedCards = 0;
    }
  }

  flipBack(pickedCards: card[]) {
    pickedCards[0].shown = pickedCards[0].reverse;
    pickedCards[1].shown = pickedCards[1].reverse;
  }

  checkCards(pickedCards: card[]): void {
    if (pickedCards[0].cardId == pickedCards[1].cardId) {
      //console.log('SAME CARDS');
      this.currentScore += 15;
      this.matchedCards += 2;
      this.checkWinner(this.matchedCards);
    } else {
      //console.log('DIFFERENT CARDS');
      this.currentScore -= 5;
      setTimeout(() => {
        this.flipBack(pickedCards);
      }, 800);
    }
    this.selectedCards = [];
  }

  checkWinner(matchedCards: number) {
    if (matchedCards == this.numberOfCards) {
      this.extraScore();
      clearInterval(this.countdown);
      this.gameStatus = 200;
    }
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

  createRecord() {
    let newRecord: records = new records();
    newRecord.punctuation = this.currentScore;
    newRecord.cards = this.numberOfCards;
    newRecord.disposedTime = this.timeLimit;
    return newRecord;
  }

  saveScore(): void {
    let token: string = this.loadedUserToken.split(',')[1];
    console.log('token ' + token);
    let newRecord: records = this.createRecord();
    this.recordrestService.postRecord(newRecord, token).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  exitGame() {
    this.router.navigate(['start']);
  }

  loadUser() {
    this.loadedUserToken = this.usersrestService.getUserToken();
    console.log('mira aqui >>>>>>>>>>> '+this.loadedUserToken);
    this.loggedUser = this.loadedUserToken != null;
  }

  ngOnInit(): void {
    this.newGame();
    this.loadUser();
  }

}
