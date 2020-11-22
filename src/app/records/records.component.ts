import { Component, OnInit } from '@angular/core';
import { records } from '../shared/models/records.model';
import { RecordrestService } from '../shared/services/recordrest.service';
import {UsersrestService} from '../shared/services/usersrest.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  /* User credentials */
  loadedUserToken: string | null = '';
  loggedUser: boolean = false;

  topRecords: records[] = [];
  userRecords: records[] = [];

  constructor(private connection: RecordrestService,
              private usersrestService: UsersrestService) { }

  showTopRecords(){
    this.connection.getTopRecords().subscribe(
    (value: records[]) => {
      this.topRecords = value;
      //console.log(value);
      }

    );
  }

  showUserRecords(){
    let username: string = this.loadedUserToken.split(',')[0];
    let token: string = this.loadedUserToken.split(',')[1];
    this.connection.getUserRecords(username, token).subscribe(
      (res: records[]) => {
        this.userRecords = res;
      }
    );
  }

  loadUser() {
    this.loadedUserToken = this.usersrestService.getUserToken();
    //console.log(this.loadedUserToken);
    if (this.loadedUserToken != null){
      this.loggedUser = true;
      this.showUserRecords();
    }
  }

  ngOnInit(): void {
    this.showTopRecords();
    this.loadUser();
  }

}
