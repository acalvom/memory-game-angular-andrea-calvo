import {Component, OnInit} from '@angular/core';
import {UsersrestService} from '../shared/services/usersrest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  passwordVisible = false;
  userToken;
  loginStatusCode;

  constructor(private connection: UsersrestService) {
  }

  loginUser(username: string, password: string): void {
    this.connection.logInUser(username, password).subscribe(
      response => {
        this.userToken = response.headers.get('Authorization');
        this.connection.setUserToken(username, this.userToken);
        this.loginStatusCode = response.status;
      },
      (error) => {
        this.loginStatusCode = error.status;
        this.password = '';
      }
    );
    //console.log('User Token: ' + this.userToken);
    //console.log('Login Status: ' + this.loginStatusCode);
  }

  showPassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
  }

}
