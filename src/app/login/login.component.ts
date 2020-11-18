import {Component, OnInit} from '@angular/core';
import {UsersrestService} from '../shared/services/usersrest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username ='';
  password ='';
  errorMsg = false;
  passwordVisible = false;
  mytoken;
  status;
  jsonobj;

  constructor(private connection: UsersrestService) { }

  loginUser(username: string, password: string): void {
    this.connection.logInUser(username, password).subscribe(
      response => {
      this.mytoken = response.headers.get('Authorization');
      this.connection.setUserToken(username,this.mytoken)
      this.status = response.status;
        console.log(this.mytoken);
        console.log(this.status);},
      (error) => {alert('Invalid user or password') }
      //this.jsonobj = response.body; //body es un obj json

    );


  }

  showPassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
  }

}
