import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMsg = false;
  passwordVisible = false;

  constructor() {
  }

  loginUser(): void {
    console.log(this.username);
    console.log(this.password);
  }

  showPassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
  }

}
