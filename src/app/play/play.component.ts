import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  valores: number[] = [];
  cartasSeleccionadas: number[] = [];
  cartasSeleccionadasIds: number[] = [];
  cartasVoletadas = 0;

  numberOfCards = 0;
  timeLimit = 0;
  score = 0;
  countdown = 0;
  currentTime = 0;

  constructor() { }

  readPreferences(): void {
    const preferences = sessionStorage.getItem('preferences');
    if (preferences == null){
      this.numberOfCards = 20;
      this.timeLimit = 0;
    } else {
      const preferencesArray = preferences.split(',').map(Number); // Para obtener el array de preferencias
      this.numberOfCards = preferencesArray[0];
      this.timeLimit = preferencesArray[1];
      console.log(preferencesArray);
    }
    this.currentTime = this.timeLimit;
  }

  ngOnInit(): void {
  }

}
