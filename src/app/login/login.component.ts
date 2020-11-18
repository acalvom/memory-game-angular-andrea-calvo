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
  jsonobj;

  constructor(private connection: UsersrestService) { }

  loginUser(username: string, password: string): void {
    //console.log(this.username);
    //console.log(this.password);
    this.connection.logInUser(username, password).subscribe(response => {
      this.mytoken = response.headers.get('Authorization');
      //this.jsonobj = response.body; //body es un obj json
      console.log(this.mytoken);
    });


  }

  showPassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
  }

}
