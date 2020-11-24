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
  token;
  username;

  topRecords: records[] = [];
  userRecords: records[] = [];
  recordStatusCode;

  constructor(private connection: RecordrestService,
              private usersrestService: UsersrestService) { }

  showTopRecords(){
    this.connection.getTopRecords().subscribe(
    (value: records[]) => {
      this.topRecords = value;
      }

    );
  }

  showUserRecords(){
    this.connection.getUserRecords(this.username, this.token).subscribe(
      (res: records[]) => {
        this.userRecords = res;
      }
    );
  }

  deleteRecords(){
    this.connection.deleteUserRecords(this.token).subscribe(
      (res) => {
        this.recordStatusCode = res.status;
      },
      (error) => {
        this.recordStatusCode = error.status;
      });
  }

  loadUser() {
    this.loadedUserToken = this.usersrestService.getUserToken();
    if (this.loadedUserToken != null){
      this.loggedUser = true;
      this.username = this.loadedUserToken.split(',')[0];
      this.token = this.loadedUserToken.split(',')[1];
      console.log(this.token);
      this.showUserRecords();
    }
  }

  ngOnInit(): void {
    this.showTopRecords();
    this.loadUser();
  }

}
