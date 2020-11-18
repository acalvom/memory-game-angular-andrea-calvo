import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UsersrestService} from '../shared/services/usersrest.service';

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

  constructor(private connection: UsersrestService) {
  }

  addUser(): void {
    if (this.newPassword !== this.repeatPassword) {
      this.errorMsg = true;
    } else {
      this.errorMsg = false;
      const newUser: User = new User(this.newUsername, this.newEmail, this.newPassword);
      this.userList.push(newUser);
      this.connection.addNewUser(newUser).subscribe(
        (res) => {console.log(res); },
        (error) => {alert('Invalid user or password')}
      )
    }
    this.newPassword = '';
    this.repeatPassword = '';
    console.log(this.userList);
  }

  ngOnInit(): void {
  }

}
