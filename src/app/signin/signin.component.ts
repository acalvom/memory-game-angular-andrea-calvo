import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  newEmail = '';
  newUsername = '';
  repeatPassword = '';
  newPassword = '';
  errorMsg = false;
  userList: User[] = [];

  constructor() {
  }

  addUser(): void {
    if (this.newPassword !== this.repeatPassword) {
      this.errorMsg = true;
    } else {
      this.errorMsg = false;
      const newUser: User = new User(this.newUsername, this.newEmail, this.newPassword);
      this.userList.push(newUser);
    }
    this.newPassword = '';
    this.repeatPassword = '';
    console.log(this.userList);
  }

  ngOnInit(): void {
  }

}
