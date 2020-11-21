import {Component, OnInit} from '@angular/core';
import {UsersrestService} from '../shared/services/usersrest.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  toDeleteToken;
  loggedUser;

  constructor(private connection: UsersrestService) {
  }

  ngOnInit(): void {
    this.toDeleteToken = this.connection.getUserToken();
    console.log(this.toDeleteToken);
    if (this.toDeleteToken != null) {
      this.loggedUser = true;
      this.connection.logOutUser();
      //console.log('User LogOut');
    } else {
      this.loggedUser = false;
      //console.log('No user logged in');
    }
    //console.log(this.toDeleteToken);
  }

}
