import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesmanagerService {

  constructor() { }
  setPreferences( numberOfCards: number, timeLimit: number ) {
    let preferences: number[] = [numberOfCards, timeLimit];
    localStorage.setItem('preferences', String(preferences));
  }

  emptyPreferences() {
    localStorage.removeItem('preferences');
  }

  getPreferences(): string | null  {
    return localStorage.getItem('preferences');
  }

}
