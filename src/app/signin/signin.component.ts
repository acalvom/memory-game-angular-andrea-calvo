import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UsersrestService} from '../shared/services/usersrest.service';
import {Observable} from 'rxjs';

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

  userStatusCode;
  userList: User[] = [];
  userExists;

  samePasswords;
  passwordStatusCode;

  constructor(private connection: UsersrestService) {
  }

  checkUser(username: string) {
    this.connection.checkUser(username).subscribe(
      response => {
        let user = response.body;
        this.userStatusCode = response.status;
        if (this.userStatusCode == 200) {
          this.userExists = true;
        }
      },
      (error) => {
        this.userExists = false;
        this.userStatusCode = error.status;
      }
      );
    //console.log(this.userExists);
    //console.log(this.userStatusCode);
  }

  addUser(): void {
      if (this.newPassword !== this.repeatPassword) {
        this.samePasswords = false;
        this.passwordStatusCode = 100;
        this.newPassword = '';
        this.repeatPassword = '';
      } else {
        this.samePasswords = true;
        const newUser: User = new User(this.newUsername, this.newEmail, this.newPassword);
        this.passwordStatusCode = 0;
        this.connection.addNewUser(newUser).subscribe(
          (res) => {
            console.log('resultado status' + res.status)
            this.passwordStatusCode = res.status;
          },
          (error) => {
            console.log(error.status);
            this.passwordStatusCode = error.status;
            this.newPassword = '';
            this.repeatPassword = '';
          }
        );
      }


  }

  ngOnInit(): void {
  }

}
